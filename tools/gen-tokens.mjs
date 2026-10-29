/**
 * Generates the Cluade theme layer (client.js) and the resolved token table
 * (design/tokens.json) from design/palette.json.
 *
 * Run: node tools/gen-tokens.mjs
 *
 * Inputs: design/palette.json (every color and contrast gate), theme.css and
 * markdown.css (the component patches and the Markdown skin that a token layer
 * cannot express).
 * Outputs: client.js (token layer + the inlined stylesheets) and
 * design/tokens.json (the resolved table used by docs and the audit).
 *
 * Why generated: the theme is a token override layer over the built-in light
 * and dark palettes, so every DSH `--dsw-*` token needs an explicit
 * `{ light, dark }` pair. Keeping the pairs in a script that reads one palette
 * file means a color change is one edit, and the contrast checks below fail
 * the build instead of shipping unreadable text.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contrastRatio } from './wcag.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const palettePath = join(root, 'design', 'palette.json')
const palette = JSON.parse(readFileSync(palettePath, 'utf8'))
const patchCss = [readFileSync(join(root, 'theme.css'), 'utf8').trim(), readFileSync(join(root, 'markdown.css'), 'utf8').trim()].join('\n\n')
const { light, dark } = palette.modes

// Palette names must exist in both modes so no token can fall back to a
// mode-specific hole.
for (const [mode, colors] of [['light', light], ['dark', dark]]) {
  if (colors === undefined || typeof colors !== 'object') {
    throw new Error(`palette.modes.${mode} is missing`)
  }
  for (const name of Object.keys(light)) {
    if (typeof colors[name] !== 'string' || colors[name].length === 0) {
      throw new Error(`palette color "${name}" has no ${mode} value`)
    }
  }
}
for (const name of Object.keys(dark)) {
  if (!(name in light)) throw new Error(`palette color "${name}" is dark-only`)
}

/**
 * DSH token -> palette color name. Aliases and specifics are the documented
 * semantic surface of the token sheets; extras cover the onboarding and
 * syntax-highlighting tokens that live outside `--dsw-alias-*`.
 */
const ALIASES = {
  'bg-base': 'canvas',
  'bg-document-preview': 'surfaceDeep',
  'bg-document-selection': 'docSelection',
  'label-document-preview': 'inkSoft',
  'bg-layer-1': 'surface',
  'bg-layer-2': 'surfaceNested',
  'bg-layer-3': 'surfaceDeep',
  'bg-mask-1': 'mask1',
  'bg-mask-2': 'mask2',
  'bg-mask-3': 'mask3',
  'bg-mask-photo': 'maskPhoto',
  'bg-mask-drop': 'maskDrop',
  'bg-module-platform': 'modulePlatform',
  'bg-multi-select': 'multiSelect',
  'bg-overlay': 'overlay',
  'bg-skeleton': 'skeleton',
  'border-inverted': 'borderInverted',
  'border-inverted2': 'borderInverted2',
  'border-l1': 'lineSoft',
  'border-l2': 'line',
  'border-l2-darkmode-thin': 'line',
  'border-l3': 'lineStrong',
  'border-l4': 'lineFirm',
  'brand-primary': 'accent',
  'brand-primary-invert': 'brandInvert',
  'brand-primary-new-colorprimary-new-color': 'accent',
  'brand-text': 'brandText',
  'button-contrast-fill': 'controlFill',
  'button-elevated-fill': 'surface',
  'button-floating-fill': 'surface',
  'button-floating-hover': 'hoverSolid',
  'button-ghost-active-border': 'ghostBorder',
  'button-ghost-active-fill': 'ghostFill',
  'button-ghost-active-hover': 'ghostHover',
  'button-info-fill': 'accent',
  'button-info-hover': 'accentDeep',
  'button-primary-dimmed': 'accentDimmed',
  'button-primary-fill': 'accent',
  'button-primary-hover': 'accentDeep',
  'button-tool-bar-fill-invisible': 'toolbarInvisible',
  'button-tool-bar-fill': 'toolbarFill',
  'button-tool-bar-hover': 'toolbarHover',
  'interactive-bg-active': 'interactiveActive',
  'interactive-bg-hover': 'hoverAlpha',
  'interactive-bg-hover-accent': 'interactiveAccent',
  'interactive-bg-hover-danger': 'interactiveDanger',
  'interactive-bg-hover-solid': 'hoverSolid',
  'label-caption': 'inkFaint',
  'label-deep-diving': 'deepDiving',
  'label-deep-diving-shimmer': 'deepDivingShimmer',
  'label-dimmed': 'inkGhost',
  'label-primary': 'ink',
  'label-primary-bluish': 'inkBluish',
  'label-primary-dimmed': 'inkDim',
  'label-primary-foreground': 'onAccent',
  'label-primary-inverted': 'labelInverted',
  'label-secondary': 'inkSoft',
  'label-shimmer': 'shimmer',
  'label-tertiary': 'inkMuted',
  'link': 'link',
  'markdown-citation': 'codeBlock',
  'markdown-code-block': 'codeBlock',
  'markdown-code-block-banner': 'codeBanner',
  'markdown-code-segment-selected': 'codeSelected',
  'markdown-code-segment-unselected': 'codeUnselected',
  'markdown-inline-code': 'inlineCode',
  'markdown-placeholder': 'surfaceAlt',
  'markdown-tag': 'markdownTag',
  'menu-icon': 'menuIcon',
  'menu-group-header-fill': 'menuGroupFill',
  'scrollbar-bg-l1': 'scrollbar',
  'scrollbar-bg-l2': 'scrollbarStrong',
  'scrollbar-hover-l1': 'scrollbarHover',
  'scrollbar-hover-l2': 'scrollbarHover',
  'state-business-primary': 'business',
  'state-business-tertiary': 'businessWash',
  'state-error-primary': 'error',
  'state-error-secondary': 'errorSoft',
  'state-idle-primary': 'idle',
  'state-success-primary': 'success',
  'state-success-secondary': 'successSoft',
  'state-success-tertiary': 'successWash',
  'state-warn-label': 'warnLabel',
  'state-warn-primary': 'warn',
  'state-warn-secondary': 'warnSoft',
  'state-warn-tertiary': 'warnWash',
  'switch-thumb': 'switchThumb',
  'toast-bg': 'toastBg',
  'toast-label': 'toastLabel',
  'tooltip-bg': 'tooltipBg',
  'tooltip-key-bg': 'tooltipKeyBg',
  'turn-trigger-bg': 'codeBlock',
  'turn-trigger-bg-hover': 'hoverAlpha',
  'code-diff-added': 'diffAdded',
  'code-diff-deleted': 'diffDeleted',
  'file-diff-added-bg': 'diffAddedBg',
  'file-diff-added-gutter': 'diffAddedGutter',
  'file-diff-added-marker': 'diffAddedMarker',
  'file-diff-deleted-bg': 'diffDeletedBg',
  'file-diff-deleted-gutter': 'diffDeletedGutter',
  'file-diff-deleted-marker': 'diffDeletedMarker',
}

const SPECIFICS = {
  'bubble': 'bubble',
  'bubble-highlight': 'bubbleHighlight',
  'input-major': 'inputMajor',
  'login-input': 'loginInput',
  'menu': 'menuFill',
  'selector': 'selector',
  'sidebar-fill': 'sidebar',
  'sidebar-nav-item-active': 'sidebarActive',
  'sidebar-nav-item-active-accent': 'sidebarActiveAccent',
  'sidebar-nav-item-hover': 'hover',
  'tip': 'tip',
}

/** Tokens outside the two documented groups; values are palette names or literal pairs. */
const EXTRAS = {
  '--dsw-alias-onboarding-accent': 'accent',
  '--dsw-alias-onboarding-card-fill': 'onboardingCardFill',
  '--dsw-alias-onboarding-secondary-fill': 'surface',
  '--dsw-alias-onboarding-checkbox-border': 'onboardingCheckboxBorder',
  '--dsw-menu-surface-fill': 'menuSurface',
  // Cluade-only tokens: they carry the selected-option fill and the reasoning
  // card material that DSH has no semantic token for; theme.css consumes them.
  '--cluade-selected-fill': 'selectedFill',
  '--cluade-reasoning-fill': 'reasoningFill',
  '--cluade-reasoning-border': 'reasoningBorder',
  // Markdown skin variables consumed by markdown.css (chat output and the
  // document preview share the same renderer container).
  '--cluade-md-text': 'mdText',
  '--cluade-md-heading': 'mdHeading',
  '--cluade-md-strong': 'mdStrong',
  '--cluade-md-muted': 'mdMuted',
  '--cluade-md-marker': 'mdMarker',
  '--cluade-md-link': 'mdLink',
  '--cluade-md-link-hover': 'mdLinkHover',
  '--cluade-md-link-border': 'mdLinkBorder',
  '--cluade-md-border': 'mdBorder',
  '--cluade-md-quote-bg': 'mdQuoteBg',
  '--cluade-md-quote-border': 'mdQuoteBorder',
  '--cluade-md-quote-text': 'mdQuoteText',
  '--cluade-md-inline-bg': 'mdInlineBg',
  '--cluade-md-inline-text': 'mdInlineText',
  '--cluade-md-inline-border': 'mdInlineBorder',
  '--cluade-md-code-bg': 'mdCodeBg',
  '--cluade-md-code-banner-bg': 'mdCodeBannerBg',
  '--cluade-md-code-border': 'mdCodeBorder',
  '--cluade-md-code-text': 'mdCodeText',
  '--cluade-md-code-banner-text': 'mdCodeBannerText',
  '--cluade-md-table-border': 'mdTableBorder',
  '--cluade-md-table-head-bg': 'mdTableHeadBg',
  '--cluade-md-table-head-text': 'mdTableHeadText',
  '--cluade-md-table-cell-border': 'mdTableCellBorder',
  '--cluade-md-table-zebra': 'mdTableZebra',
  '--cluade-md-table-hover': 'mdTableHover',
  '--cluade-md-selection-bg': 'mdSelectionBg',
  '--cluade-md-selection-text': 'mdSelectionText',
  '--cluade-md-syn-keyword': 'synMdKeyword',
  '--cluade-md-syn-string': 'synMdString',
  '--cluade-md-syn-string-expr': 'synMdStringExpr',
  '--cluade-md-syn-comment': 'synMdComment',
  '--cluade-md-syn-parameter': 'synMdParameter',
  '--cluade-md-syn-function': 'synMdFunction',
  '--cluade-md-syn-constant': 'synMdConstant',
  '--cluade-md-syn-punctuation': 'synMdPunctuation',
  '--cluade-md-syn-link': 'synMdLink',
  '--shiki-foreground': { light: 'var(--dsw-alias-label-primary)', dark: 'var(--dsw-alias-label-primary)' },
  '--shiki-background': { light: 'var(--dsw-alias-markdown-code-block)', dark: 'var(--dsw-alias-markdown-code-block)' },
  '--shiki-token-constant': 'synConstant',
  '--shiki-token-string': 'synString',
  '--shiki-token-string-expression': 'synStringExpr',
  '--shiki-token-comment': 'synComment',
  '--shiki-token-keyword': 'synKeyword',
  '--shiki-token-parameter': 'synParameter',
  '--shiki-token-function': 'synFunction',
  '--shiki-token-punctuation': 'synPunctuation',
  '--shiki-token-link': 'synLink',
}

function pairFor(token, spec) {
  if (typeof spec === 'object' && spec !== null) {
    return { light: spec.light, dark: spec.dark }
  }
  const value = light[spec]
  if (typeof value !== 'string') {
    throw new Error(`token ${token} points at unknown palette color "${spec}"`)
  }
  return { light: value, dark: dark[spec] }
}

const tokens = {}
for (const [suffix, spec] of Object.entries(ALIASES)) {
  tokens[`--dsw-alias-${suffix}`] = pairFor(`--dsw-alias-${suffix}`, spec)
}
for (const [suffix, spec] of Object.entries(SPECIFICS)) {
  tokens[`--dsw-specific-${suffix}`] = pairFor(`--dsw-specific-${suffix}`, spec)
}
for (const [name, spec] of Object.entries(EXTRAS)) {
  tokens[name] = pairFor(name, spec)
}

const names = Object.keys(tokens)
if (names.length !== new Set(names).size) throw new Error('duplicate token names')

// Contrast gate: every declared check must resolve to an opaque color pair.
const failures = []
const lines = []
for (const check of palette.checks) {
  const row = []
  for (const mode of ['light', 'dark']) {
    const fg = palette.modes[mode][check.fg]
    const bg = palette.modes[mode][check.bg]
    if (fg === undefined) throw new Error(`check "${check.name}" uses unknown palette color "${check.fg}"`)
    if (bg === undefined) throw new Error(`check "${check.name}" uses unknown palette color "${check.bg}"`)
    const ratio = contrastRatio(fg, bg)
    row.push(ratio)
    if (ratio < check.min) {
      failures.push(`${check.name} [${mode}] ${ratio.toFixed(2)}:1 < ${check.min}:1 (${fg} on ${bg})`)
    }
  }
  lines.push(
    `${check.name.padEnd(38)} light ${row[0].toFixed(2).padStart(5)}:1   dark ${row[1].toFixed(2).padStart(5)}:1   min ${check.min}:1`,
  )
}

const tokenBody = Object.entries(tokens)
  .map(([name, pair]) => `    ${JSON.stringify(name)}: { light: ${JSON.stringify(pair.light)}, dark: ${JSON.stringify(pair.dark)} },`)
  .join('\n')

const header = `/**
 * Cluade — warm paper-and-terracotta theme layer for the DSH Web client.
 *
 * GENERATED FILE: edit design/palette.json, theme.css, markdown.css, or the mapping in
 * tools/gen-tokens.mjs, then run \`node tools/gen-tokens.mjs\`.
 *
 * Registers an override layer through ctx.theme.overrideTokens: the built-in
 * light/dark/system preference still decides which palette is active, and this
 * layer supplies the warm variant of each palette. Because it is an override
 * layer rather than a registered theme id, the user's stored appearance
 * preference is never touched, and unloading the plugin restores the stock
 * palette immediately.
 *
 * \`window.__ModuleLoader__\` is how the DSH Web page loads plugin client
 * entries (lazy CJS factory form).
 */
`

const escapedCss = patchCss.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$\{/g, '\\${')
const client = `${header}window.__ModuleLoader__.load({
  id: 'dsh-theme-cluade',
  factory() {
    const SOURCE = 'dsh-theme-cluade'
    const TOKENS = {
${tokenBody}
    }
    /** theme.css + markdown.css: component patches and Markdown skin. */
    const PATCH_CSS = \`${escapedCss}\`

    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(() => {
          const disposeTokens = ctx.theme.overrideTokens(SOURCE, TOKENS)
          const style = document.createElement('style')
          style.dataset.dshTheme = SOURCE
          style.textContent = PATCH_CSS
          document.head.append(style)
          return () => {
            disposeTokens()
            style.remove()
          }
        }, 'dsh-theme-cluade: warm palette layer')
      },
    }
  },
})
`

const resolved = {
  theme: palette.name,
  reference: palette.reference,
  generatedFrom: 'design/palette.json',
  tokenCount: names.length,
  tokens,
}

writeFileSync(join(root, 'client.js'), client)
writeFileSync(join(root, 'design', 'tokens.json'), `${JSON.stringify(resolved, null, 2)}\n`)

console.log(`wrote client.js with ${names.length} tokens`)
console.log(`wrote design/tokens.json (embedded theme.css + markdown.css: ${patchCss.length} chars)`)
console.log('\ncontrast checks (WCAG 2.1):')
for (const line of lines) console.log(`  ${line}`)

if (failures.length > 0) {
  console.error(`\n${failures.length} contrast check(s) failed:`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exitCode = 1
} else {
  console.log('\nall contrast checks passed')
}
