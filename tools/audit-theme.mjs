/**
 * Read-only audit for the Cluade bundle.
 *
 * Runs the actual client.js in a sandbox with a fake `window.__ModuleLoader__`
 * and a fake Cordis context, so it verifies the shipped artifact instead of
 * re-reading the palette the generator used. Checks:
 *
 *  1. manifest: bundle patch + client declaration + exported resources
 *  2. display resources: locale title/description (en + zh) and icon.svg
 *  3. runtime contract: client entry applies inside ctx.effect, registers an
 *     override layer under the package name, and its disposer removes it
 *  4. token data: 128 tokens, every one a { light, dark } string pair, and the
 *     documented built-in alias surface is fully covered
 *  5. consistency: shipped tokens equal design/tokens.json
 *  6. component patches: the inlined stylesheet equals theme.css + markdown.css, is
 *     darwin-scoped, and is removed together with the token layer
 *  7. contrast: independent WCAG recomputation of active/passive text pairs
 *
 * Run: node tools/audit-theme.mjs   (exit code 0 = all checks passed)
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { contrastRatio } from './wcag.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const read = (relative) => readFileSync(join(root, relative), 'utf8')
const json = (relative) => JSON.parse(read(relative))

const results = []
const check = (name, condition, detail = '') => {
  results.push({ name, ok: Boolean(condition), detail })
}
const expect = (name, fn) => {
  try {
    fn()
    check(name, true)
  } catch (error) {
    check(name, false, error.message)
  }
}

const pkg = json('package.json')

expect('package name is dsh-theme-cluade', () => {
  if (pkg.name !== 'dsh-theme-cluade') throw new Error(`name is ${pkg.name}`)
})
expect('bundle patch declared and present', () => {
  const patch = pkg.dsh?.bundle?.patch
  if (typeof patch !== 'string') throw new Error('dsh.bundle.patch missing')
  if (!read(patch).includes('dsh-theme-cluade')) throw new Error('patch does not insert the package row')
})
expect('client declaration targets the web platform', () => {
  const client = pkg.dsh?.client
  if (client?.platform !== 'web') throw new Error('dsh.client.platform is not web')
  if (client?.immediately !== true) throw new Error('dsh.client.immediately is not true')
  if (!client?.inject?.includes('@deepseek-ai/dsh-client-ui-theme')) {
    throw new Error('dsh.client.inject does not order after ui-theme')
  }
})
expect('exports expose client, locale, and icon', () => {
  for (const subpath of ['./client', './locale/*.json', './icon']) {
    if (!(subpath in (pkg.exports ?? {}))) throw new Error(`missing export ${subpath}`)
  }
})
expect('files list ships every runtime artifact', () => {
  const files = pkg.files ?? []
  for (const entry of ['index.js', 'client.js', 'cordis.patch.yml', 'locale/*.json', 'icon.svg']) {
    if (!files.includes(entry)) throw new Error(`files is missing ${entry}`)
  }
})
expect('host half is a valid Cordis plugin', () => {
  if (!read('index.js').includes('export function apply')) throw new Error('index.js has no apply export')
})

// --- display resources -----------------------------------------------------
for (const locale of ['en', 'zh']) {
  expect(`locale/${locale}.json has meta title and description`, () => {
    const value = json(`locale/${locale}.json`)
    if (typeof value.meta?.title !== 'string' || value.meta.title.length === 0) throw new Error('meta.title missing')
    if (typeof value.meta?.description !== 'string' || value.meta.description.length === 0) {
      throw new Error('meta.description missing')
    }
  })
}
expect('icon.svg is a small, self-contained SVG', () => {
  const svg = read('icon.svg')
  if (!/^<svg[\s>]/.test(svg.trim())) throw new Error('does not start with <svg>')
  if (!svg.includes('viewBox=')) throw new Error('viewBox missing')
  if (Buffer.byteLength(svg) > 256 * 1024) throw new Error('larger than 256 KiB')
  if (/<script|(?:xlink:)?href\s*=\s*["']https?:|src\s*=\s*["']https?:/.test(svg)) {
    throw new Error('contains an external reference')
  }
})

// --- runtime contract ------------------------------------------------------
let entry
const styles = []
const sandbox = {
  window: {
    __ModuleLoader__: {
      load(candidate) {
        entry = candidate
      },
    },
  },
  document: {
    createElement: () => {
      const element = {
        dataset: {},
        textContent: '',
        removed: false,
        remove() {
          this.removed = true
        },
      }
      return element
    },
    head: {
      append(element) {
        styles.push(element)
      },
    },
  },
}
vm.runInNewContext(read('client.js'), sandbox, { filename: 'client.js' })

expect('client entry registers itself with the module loader', () => {
  if (entry === undefined) throw new Error('window.__ModuleLoader__.load was not called')
  if (entry.id !== pkg.name) throw new Error(`entry id ${JSON.stringify(entry.id)} does not match package name`)
  if (typeof entry.factory !== 'function') throw new Error('factory missing')
})

const plugin = entry.factory((request) => {
  throw new Error(`unexpected require(${JSON.stringify(request)})`)
})

expect('client plugin injects theme and exposes apply', () => {
  if (!Array.isArray(plugin.inject) || !plugin.inject.includes('theme')) throw new Error('inject does not include theme')
  if (typeof plugin.apply !== 'function') throw new Error('apply missing')
})

let source
let tokens
let removed = false
const effects = []
const ctx = {
  effect(callback) {
    effects.push(callback())
    return effects.at(-1)
  },
  theme: {
    overrideTokens(from, overrides) {
      source = from
      tokens = overrides
      return () => {
        removed = true
      }
    },
  },
}

expect('apply registers exactly one theme effect', () => {
  plugin.apply(ctx)
  if (effects.length !== 1) throw new Error(`registered ${effects.length} effects`)
})
expect('override layer is owned by the package id', () => {
  if (source !== pkg.name) throw new Error(`source is ${JSON.stringify(source)}`)
})
expect('apply also inserts the component patches (sidebar / selected / reasoning / markdown)', () => {
  if (styles.length !== 1) throw new Error(`inserted ${styles.length} stylesheets`)
  const css = styles[0].textContent
  if (!css.includes("html[data-platform='darwin']")) throw new Error('patch is not scoped to darwin')
  if (!css.includes("[class$='_sidebarCol']")) throw new Error('patch does not target the sidebar class token')
  if (!css.includes('var(--dsw-specific-sidebar-fill)')) throw new Error('patch does not paint the warm sidebar token')
  if (!css.includes('[data-ds-dark-theme]')) throw new Error('sidebar patch has no dark-mode rule')
  if (!css.includes("[class*='_selectedFill']")) throw new Error('patch has no selected-option rule')
  if (!css.includes("[data-variant='think']")) throw new Error('patch has no reasoning-block rule')
  if (!css.includes("[class*='_markdown']")) throw new Error('patch has no Markdown skin scope')
  if (!css.includes('.md-code-block')) throw new Error('patch has no Markdown code-block rule')
  const source = [read('theme.css').trim(), read('markdown.css').trim()].join('\n\n')
  if (css !== source) throw new Error('inlined stylesheet drifted from theme.css + markdown.css — rerun node tools/gen-tokens.mjs')
})
expect('effect exposes a disposer that removes the layer and the patch', () => {
  const dispose = effects[0]
  if (typeof dispose !== 'function') throw new Error('effect returned no disposer')
  dispose()
  if (!removed) throw new Error('disposer did not remove the token layer')
  if (!styles[0].removed) throw new Error('disposer did not remove the sidebar patch')
})

// --- token data ------------------------------------------------------------
expect('token map covers the documented built-in surface', () => {
  const documented = [
    '--dsw-alias-bg-base',
    '--dsw-alias-bg-layer-1',
    '--dsw-alias-bg-layer-2',
    '--dsw-alias-bg-overlay',
    '--dsw-alias-border-l1',
    '--dsw-alias-border-l2',
    '--dsw-alias-brand-primary',
    '--dsw-alias-label-primary',
    '--dsw-alias-label-secondary',
    '--dsw-alias-state-error-primary',
    '--dsw-alias-state-idle-primary',
    '--dsw-alias-state-success-primary',
    '--dsw-alias-state-warn-primary',
    '--dsw-specific-sidebar-fill',
  ]
  const missing = documented.filter((name) => !(name in tokens))
  if (missing.length > 0) throw new Error(`missing ${missing.join(', ')}`)
})
expect('every token is a light/dark string pair', () => {
  for (const [name, value] of Object.entries(tokens)) {
    if (typeof value !== 'object' || value === null) throw new Error(`${name} is not an object`)
    if (typeof value.light !== 'string' || value.light.length === 0) throw new Error(`${name}.light is not a string`)
    if (typeof value.dark !== 'string' || value.dark.length === 0) throw new Error(`${name}.dark is not a string`)
  }
})
expect('token count matches design/tokens.json', () => {
  const resolved = json('design/tokens.json')
  if (resolved.tokenCount !== Object.keys(tokens).length) {
    throw new Error(`design/tokens.json says ${resolved.tokenCount}, client.js ships ${Object.keys(tokens).length}`)
  }
})
expect('shipped token values match design/tokens.json', () => {
  const resolved = json('design/tokens.json')
  for (const [name, value] of Object.entries(tokens)) {
    const recorded = resolved.tokens[name]
    if (recorded === undefined) throw new Error(`${name} missing from design/tokens.json`)
    if (recorded.light !== value.light || recorded.dark !== value.dark) throw new Error(`${name} drifted from design/tokens.json`)
  }
})

// --- contrast (recomputed from the shipped values) -------------------------
const contrastPairs = [
  ['label-primary on base', '--dsw-alias-label-primary', '--dsw-alias-bg-base', 7],
  ['label-secondary on base', '--dsw-alias-label-secondary', '--dsw-alias-bg-base', 4.5],
  ['label-tertiary on base', '--dsw-alias-label-tertiary', '--dsw-alias-bg-base', 4.5],
  ['label-caption on base', '--dsw-alias-label-caption', '--dsw-alias-bg-base', 3.5],
  ['link on base', '--dsw-alias-link', '--dsw-alias-bg-base', 4.5],
  ['button label on brand fill', '--dsw-alias-label-primary-foreground', '--dsw-alias-brand-primary', 4.5],
  ['user bubble text', '--dsw-alias-label-primary', '--dsw-specific-bubble', 7],
  ['selected option text', '--dsw-alias-label-primary', '--cluade-selected-fill', 7],
  ['reasoning body text', '--dsw-alias-label-primary', '--cluade-reasoning-fill', 7],
  ['markdown body text', '--cluade-md-text', '--dsw-alias-bg-base', 7],
  ['markdown headings', '--cluade-md-heading', '--dsw-alias-bg-base', 7],
  ['markdown links', '--cluade-md-link', '--dsw-alias-bg-base', 4.5],
  ['markdown inline code text', '--cluade-md-inline-text', '--cluade-md-inline-bg', 4.5],
  ['markdown quote text', '--cluade-md-quote-text', '--cluade-md-quote-bg', 4.5],
  ['markdown code block text', '--cluade-md-code-text', '--cluade-md-code-bg', 7],
  ['markdown table header', '--cluade-md-table-head-text', '--cluade-md-table-head-bg', 4.5],
  ['markdown syntax keyword', '--cluade-md-syn-keyword', '--cluade-md-code-bg', 4.5],
  ['markdown syntax comment', '--cluade-md-syn-comment', '--cluade-md-code-bg', 3],
  ['brand wordmark on sidebar', '--dsw-alias-brand-text', '--dsw-specific-sidebar-fill', 7],
  ['syn keyword on code block', '--shiki-token-keyword', '--dsw-alias-markdown-code-block', 4.5],
  ['syn comment on code block', '--shiki-token-comment', '--dsw-alias-markdown-code-block', 3],
]
for (const [label, fgToken, bgToken, min] of contrastPairs) {
  for (const mode of ['light', 'dark']) {
    expect(`contrast ${label} [${mode}] >= ${min}:1`, () => {
      const fg = tokens[fgToken]?.[mode]
      const bg = tokens[bgToken]?.[mode]
      if (fg === undefined || bg === undefined) throw new Error('token missing')
      const ratio = contrastRatio(fg, bg)
      if (ratio < min) throw new Error(`${ratio.toFixed(2)}:1 (${fg} on ${bg})`)
    })
  }
}

// --- report ----------------------------------------------------------------
const failed = results.filter((result) => !result.ok)
for (const result of results) {
  console.log(`${result.ok ? 'ok  ' : 'FAIL'}  ${result.name}${result.ok || result.detail === '' ? '' : ` — ${result.detail}`}`)
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (Object.keys(tokens).length > 0) console.log(`token count: ${Object.keys(tokens).length}`)
process.exitCode = failed.length === 0 ? 0 : 1
