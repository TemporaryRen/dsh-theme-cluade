/**
 * Cluade — warm paper-and-terracotta theme layer for the DSH Web client.
 *
 * GENERATED FILE: edit design/palette.json, theme.css, markdown.css, or the mapping in
 * tools/gen-tokens.mjs, then run `node tools/gen-tokens.mjs`.
 *
 * Registers an override layer through ctx.theme.overrideTokens: the built-in
 * light/dark/system preference still decides which palette is active, and this
 * layer supplies the warm variant of each palette. Because it is an override
 * layer rather than a registered theme id, the user's stored appearance
 * preference is never touched, and unloading the plugin restores the stock
 * palette immediately.
 *
 * `window.__ModuleLoader__` is how the DSH Web page loads plugin client
 * entries (lazy CJS factory form).
 */
window.__ModuleLoader__.load({
  id: 'dsh-theme-cluade',
  factory() {
    const SOURCE = 'dsh-theme-cluade'
    const TOKENS = {
    "--dsw-alias-bg-base": { light: "#F8F4EA", dark: "#1B1815" },
    "--dsw-alias-bg-document-preview": { light: "#EDE4D6", dark: "#322B24" },
    "--dsw-alias-bg-document-selection": { light: "rgba(185,96,61,0.28)", dark: "rgba(217,119,87,0.30)" },
    "--dsw-alias-label-document-preview": { light: "#575044", dark: "#BDB2A2" },
    "--dsw-alias-bg-layer-1": { light: "#FFFEFB", dark: "#221E1A" },
    "--dsw-alias-bg-layer-2": { light: "#F4EDE2", dark: "#2A241E" },
    "--dsw-alias-bg-layer-3": { light: "#EDE4D6", dark: "#322B24" },
    "--dsw-alias-bg-mask-1": { light: "rgba(38,31,25,0.30)", dark: "rgba(0,0,0,0.55)" },
    "--dsw-alias-bg-mask-2": { light: "rgba(38,31,25,0.13)", dark: "rgba(0,0,0,0.22)" },
    "--dsw-alias-bg-mask-3": { light: "rgba(38,31,25,0.48)", dark: "rgba(0,0,0,0.55)" },
    "--dsw-alias-bg-mask-photo": { light: "rgba(20,17,14,0.88)", dark: "rgba(0,0,0,0.88)" },
    "--dsw-alias-bg-mask-drop": { light: "rgba(252,250,246,0.72)", dark: "rgba(34,28,23,0.72)" },
    "--dsw-alias-bg-module-platform": { light: "#EFE2CF", dark: "#332C24" },
    "--dsw-alias-bg-multi-select": { light: "#F5EEE3", dark: "#2A241E" },
    "--dsw-alias-bg-overlay": { light: "#FCF8F0", dark: "#2A241E" },
    "--dsw-alias-bg-skeleton": { light: "rgba(66,52,38,0.07)", dark: "rgba(239,231,219,0.08)" },
    "--dsw-alias-border-inverted": { light: "rgba(0,0,0,0)", dark: "rgba(239,231,219,0.08)" },
    "--dsw-alias-border-inverted2": { light: "rgba(0,0,0,0)", dark: "rgba(239,231,219,0.09)" },
    "--dsw-alias-border-l1": { light: "rgba(57,48,39,0.10)", dark: "rgba(239,231,219,0.10)" },
    "--dsw-alias-border-l2": { light: "rgba(57,48,39,0.16)", dark: "rgba(239,231,219,0.16)" },
    "--dsw-alias-border-l2-darkmode-thin": { light: "rgba(57,48,39,0.16)", dark: "rgba(239,231,219,0.16)" },
    "--dsw-alias-border-l3": { light: "rgba(57,48,39,0.22)", dark: "rgba(239,231,219,0.22)" },
    "--dsw-alias-border-l4": { light: "rgba(57,48,39,0.29)", dark: "rgba(239,231,219,0.30)" },
    "--dsw-alias-brand-primary": { light: "#B05C3A", dark: "#D97757" },
    "--dsw-alias-brand-primary-invert": { light: "#1E1A16", dark: "#F6EFE4" },
    "--dsw-alias-brand-primary-new-colorprimary-new-color": { light: "#B05C3A", dark: "#D97757" },
    "--dsw-alias-brand-text": { light: "#2B2620", dark: "#EFE7DB" },
    "--dsw-alias-button-contrast-fill": { light: "#3B352D", dark: "#EFE7DB" },
    "--dsw-alias-button-elevated-fill": { light: "#FFFEFB", dark: "#221E1A" },
    "--dsw-alias-button-floating-fill": { light: "#FFFEFB", dark: "#221E1A" },
    "--dsw-alias-button-floating-hover": { light: "#E9E1D2", dark: "#332C24" },
    "--dsw-alias-button-ghost-active-border": { light: "#B3A593", dark: "#6A5F52" },
    "--dsw-alias-button-ghost-active-fill": { light: "#F2EBDF", dark: "#322B24" },
    "--dsw-alias-button-ghost-active-hover": { light: "#EAE2D5", dark: "#3A332A" },
    "--dsw-alias-button-info-fill": { light: "#B05C3A", dark: "#D97757" },
    "--dsw-alias-button-info-hover": { light: "#9C4E2F", dark: "#E68C6C" },
    "--dsw-alias-button-primary-dimmed": { light: "#F0E1D4", dark: "#3A2F26" },
    "--dsw-alias-button-primary-fill": { light: "#B05C3A", dark: "#D97757" },
    "--dsw-alias-button-primary-hover": { light: "#9C4E2F", dark: "#E68C6C" },
    "--dsw-alias-button-tool-bar-fill-invisible": { light: "rgba(31,27,23,0.36)", dark: "rgba(17,14,11,0.36)" },
    "--dsw-alias-button-tool-bar-fill": { light: "rgba(84,77,68,0.50)", dark: "rgba(56,50,43,0.60)" },
    "--dsw-alias-button-tool-bar-hover": { light: "rgba(84,77,68,0.60)", dark: "rgba(70,62,53,0.72)" },
    "--dsw-alias-interactive-bg-active": { light: "rgba(64,48,34,0.14)", dark: "rgba(239,231,219,0.13)" },
    "--dsw-alias-interactive-bg-hover": { light: "rgba(64,48,34,0.09)", dark: "rgba(239,231,219,0.07)" },
    "--dsw-alias-interactive-bg-hover-accent": { light: "rgba(185,96,61,0.14)", dark: "rgba(217,119,87,0.16)" },
    "--dsw-alias-interactive-bg-hover-danger": { light: "rgba(178,74,58,0.12)", dark: "rgba(224,130,109,0.14)" },
    "--dsw-alias-interactive-bg-hover-solid": { light: "#E9E1D2", dark: "#332C24" },
    "--dsw-alias-label-caption": { light: "#857B6C", dark: "#8B8173" },
    "--dsw-alias-label-deep-diving": { light: "#A55332", dark: "#E08A6A" },
    "--dsw-alias-label-deep-diving-shimmer": { light: "#C1785A", dark: "#F0A98C" },
    "--dsw-alias-label-dimmed": { light: "#B7AC9C", dark: "#554C42" },
    "--dsw-alias-label-primary": { light: "#2B2620", dark: "#F1EAE0" },
    "--dsw-alias-label-primary-bluish": { light: "#3A3027", dark: "#EFE7DB" },
    "--dsw-alias-label-primary-dimmed": { light: "#3B352D", dark: "#CCC2B4" },
    "--dsw-alias-label-primary-foreground": { light: "#FFFDF9", dark: "#1B1815" },
    "--dsw-alias-label-primary-inverted": { light: "#FFFDF9", dark: "#1B1815" },
    "--dsw-alias-label-secondary": { light: "#575044", dark: "#BDB2A2" },
    "--dsw-alias-label-shimmer": { light: "rgba(41,35,29,0.30)", dark: "rgba(246,239,228,0.45)" },
    "--dsw-alias-label-tertiary": { light: "#6E6558", dark: "#A39889" },
    "--dsw-alias-link": { light: "#A55332", dark: "#E08A6A" },
    "--dsw-alias-markdown-citation": { light: "#F2EBDD", dark: "#241F1A" },
    "--dsw-alias-markdown-code-block": { light: "#F2EBDD", dark: "#241F1A" },
    "--dsw-alias-markdown-code-block-banner": { light: "#ECE3D5", dark: "#2C2620" },
    "--dsw-alias-markdown-code-segment-selected": { light: "#FFFEFB", dark: "#3A322A" },
    "--dsw-alias-markdown-code-segment-unselected": { light: "#EEE5D8", dark: "#241F1A" },
    "--dsw-alias-markdown-inline-code": { light: "#F0E8DA", dark: "#2C2620" },
    "--dsw-alias-markdown-placeholder": { light: "#F2EADE", dark: "#241F1A" },
    "--dsw-alias-markdown-tag": { light: "#F0E7D9", dark: "#2C2620" },
    "--dsw-alias-menu-icon": { light: "#4E463C", dark: "#C9BFB1" },
    "--dsw-alias-menu-group-header-fill": { light: "rgba(251,247,239,0.95)", dark: "rgba(46,39,33,0.94)" },
    "--dsw-alias-scrollbar-bg-l1": { light: "rgba(74,62,48,0.24)", dark: "rgba(239,231,219,0.18)" },
    "--dsw-alias-scrollbar-bg-l2": { light: "rgba(74,62,48,0.30)", dark: "rgba(239,231,219,0.24)" },
    "--dsw-alias-scrollbar-hover-l1": { light: "rgba(74,62,48,0.36)", dark: "rgba(239,231,219,0.30)" },
    "--dsw-alias-scrollbar-hover-l2": { light: "rgba(74,62,48,0.36)", dark: "rgba(239,231,219,0.30)" },
    "--dsw-alias-state-business-primary": { light: "#B05C3A", dark: "#D97757" },
    "--dsw-alias-state-business-tertiary": { light: "#F3E5DA", dark: "#3A2A22" },
    "--dsw-alias-state-error-primary": { light: "#B24A3A", dark: "#E0826D" },
    "--dsw-alias-state-error-secondary": { light: "#C9735F", dark: "#C9735F" },
    "--dsw-alias-state-idle-primary": { light: "#C0B5A5", dark: "#4B443B" },
    "--dsw-alias-state-success-primary": { light: "#6F7F54", dark: "#A6B487" },
    "--dsw-alias-state-success-secondary": { light: "#8D9673", dark: "#8F9E70" },
    "--dsw-alias-state-success-tertiary": { light: "#E9EBDE", dark: "#283022" },
    "--dsw-alias-state-warn-label": { light: "#8A5E15", dark: "#E1C48A" },
    "--dsw-alias-state-warn-primary": { light: "#A8761F", dark: "#D8B26A" },
    "--dsw-alias-state-warn-secondary": { light: "#C99A3F", dark: "#E1C48A" },
    "--dsw-alias-state-warn-tertiary": { light: "#F8EDD6", dark: "#332A1C" },
    "--dsw-alias-switch-thumb": { light: "#FFFDF9", dark: "#C4B7A6" },
    "--dsw-alias-toast-bg": { light: "#2E2823", dark: "#3A342D" },
    "--dsw-alias-toast-label": { light: "#FBF7EF", dark: "#F6EFE4" },
    "--dsw-alias-tooltip-bg": { light: "#3A342D", dark: "#423A31" },
    "--dsw-alias-tooltip-key-bg": { light: "color-mix(in srgb, #3A342D, white 18%)", dark: "color-mix(in srgb, #423A31, white 18%)" },
    "--dsw-alias-turn-trigger-bg": { light: "#F2EBDD", dark: "#241F1A" },
    "--dsw-alias-turn-trigger-bg-hover": { light: "rgba(64,48,34,0.09)", dark: "rgba(239,231,219,0.07)" },
    "--dsw-alias-code-diff-added": { light: "rgba(34,197,94,0.08)", dark: "rgba(65,201,119,0.12)" },
    "--dsw-alias-code-diff-deleted": { light: "rgba(186,39,35,0.08)", dark: "rgba(244,66,62,0.12)" },
    "--dsw-alias-file-diff-added-bg": { light: "#EAF2E4", dark: "#1F3124" },
    "--dsw-alias-file-diff-added-gutter": { light: "#F0F6EC", dark: "#132016" },
    "--dsw-alias-file-diff-added-marker": { light: "#4E8A57", dark: "#41C977" },
    "--dsw-alias-file-diff-deleted-bg": { light: "#F9E8E2", dark: "#3C1F1B" },
    "--dsw-alias-file-diff-deleted-gutter": { light: "#FCF0EC", dark: "#28130E" },
    "--dsw-alias-file-diff-deleted-marker": { light: "#B4483A", dark: "#FA423E" },
    "--dsw-specific-bubble": { light: "#F0E7DA", dark: "#2E2721" },
    "--dsw-specific-bubble-highlight": { light: "#E5D3BE", dark: "#3A3128" },
    "--dsw-specific-input-major": { light: "#FFFEFB", dark: "#262119" },
    "--dsw-specific-login-input": { light: "#F4EDE2", dark: "#241F1A" },
    "--dsw-specific-menu": { light: "rgba(253,250,244,0.90)", dark: "rgba(40,34,28,0.86)" },
    "--dsw-specific-selector": { light: "#F2EADC", dark: "#2B241E" },
    "--dsw-specific-sidebar-fill": { light: "#F0ECE4", dark: "#161311" },
    "--dsw-specific-sidebar-nav-item-active": { light: "#E6D8C6", dark: "#332C24" },
    "--dsw-specific-sidebar-nav-item-active-accent": { light: "#ECDFCD", dark: "#3F342A" },
    "--dsw-specific-sidebar-nav-item-hover": { light: "#F6EFE4", dark: "#2E2721" },
    "--dsw-specific-tip": { light: "#F1E8DA", dark: "#2C261F" },
    "--dsw-alias-onboarding-accent": { light: "#B05C3A", dark: "#D97757" },
    "--dsw-alias-onboarding-card-fill": { light: "color-mix(in srgb, #FFFEFB 80%, transparent)", dark: "color-mix(in srgb, #221E1A 80%, transparent)" },
    "--dsw-alias-onboarding-secondary-fill": { light: "#FFFEFB", dark: "#221E1A" },
    "--dsw-alias-onboarding-checkbox-border": { light: "color-mix(in srgb, #2B2620 22%, transparent)", dark: "color-mix(in srgb, #EFE7DB 20%, transparent)" },
    "--dsw-menu-surface-fill": { light: "rgba(252,247,237,0.62)", dark: "rgba(44,38,32,0.58)" },
    "--cluade-selected-fill": { light: "#E7D7C7", dark: "#413529" },
    "--cluade-reasoning-fill": { light: "#F3E7D5", dark: "#241E18" },
    "--cluade-reasoning-border": { light: "#D3BC9C", dark: "#514537" },
    "--cluade-md-text": { light: "#51473D", dark: "#DDD2C4" },
    "--cluade-md-heading": { light: "#48382B", dark: "#F1E7DA" },
    "--cluade-md-strong": { light: "#61432C", dark: "#F0DFCB" },
    "--cluade-md-muted": { light: "#958371", dark: "#A1937F" },
    "--cluade-md-marker": { light: "#B58B63", dark: "#C08A5E" },
    "--cluade-md-link": { light: "#AA5533", dark: "#E08A6A" },
    "--cluade-md-link-hover": { light: "#8F4226", dark: "#EDA37F" },
    "--cluade-md-link-border": { light: "#DCB89B", dark: "#7A5544" },
    "--cluade-md-border": { light: "#E5D9C9", dark: "#3A322A" },
    "--cluade-md-quote-bg": { light: "#F4EEE4", dark: "#2A241E" },
    "--cluade-md-quote-border": { light: "#CB9A70", dark: "#C9835C" },
    "--cluade-md-quote-text": { light: "#7C6549", dark: "#B7A28C" },
    "--cluade-md-inline-bg": { light: "#F1E6D6", dark: "#322A22" },
    "--cluade-md-inline-text": { light: "#93542C", dark: "#DDA277" },
    "--cluade-md-inline-border": { light: "#EAD9C2", dark: "#43382C" },
    "--cluade-md-code-bg": { light: "#332C26", dark: "#1E1915" },
    "--cluade-md-code-banner-bg": { light: "#3C3128", dark: "#262019" },
    "--cluade-md-code-border": { light: "#43372C", dark: "#2E2620" },
    "--cluade-md-code-text": { light: "#E0CDB4", dark: "#E7DCCB" },
    "--cluade-md-code-banner-text": { light: "#C3A07A", dark: "#C9B49B" },
    "--cluade-md-table-border": { light: "#E2D2BD", dark: "#3D342B" },
    "--cluade-md-table-head-bg": { light: "#F1E7D8", dark: "#332B23" },
    "--cluade-md-table-head-text": { light: "#845C38", dark: "#D3B08A" },
    "--cluade-md-table-cell-border": { light: "#ECE0CF", dark: "#322A22" },
    "--cluade-md-table-zebra": { light: "#FAF5EB", dark: "#241F1A" },
    "--cluade-md-table-hover": { light: "#F5EBDC", dark: "#2C251F" },
    "--cluade-md-selection-bg": { light: "#E9C9A5", dark: "#5A3C2A" },
    "--cluade-md-selection-text": { light: "#61432C", dark: "#F5E7D8" },
    "--cluade-md-syn-keyword": { light: "#DFA27C", dark: "#E39A7B" },
    "--cluade-md-syn-string": { light: "#B7C396", dark: "#A9B986" },
    "--cluade-md-syn-string-expr": { light: "#C7D0A8", dark: "#B9C795" },
    "--cluade-md-syn-comment": { light: "#A28D75", dark: "#8A8074" },
    "--cluade-md-syn-parameter": { light: "#E7C48B", dark: "#DDAF6C" },
    "--cluade-md-syn-function": { light: "#E7C48B", dark: "#E8B183" },
    "--cluade-md-syn-constant": { light: "#C7B1D0", dark: "#C9A06A" },
    "--cluade-md-syn-punctuation": { light: "#C3B49E", dark: "#B4A899" },
    "--cluade-md-syn-link": { light: "#9FC3B8", dark: "#7FB3B8" },
    "--shiki-foreground": { light: "var(--dsw-alias-label-primary)", dark: "var(--dsw-alias-label-primary)" },
    "--shiki-background": { light: "var(--dsw-alias-markdown-code-block)", dark: "var(--dsw-alias-markdown-code-block)" },
    "--shiki-token-constant": { light: "#9A5B2E", dark: "#C9A06A" },
    "--shiki-token-string": { light: "#566C40", dark: "#A9B986" },
    "--shiki-token-string-expression": { light: "#5A6D3E", dark: "#B9C795" },
    "--shiki-token-comment": { light: "#7E7466", dark: "#8B8173" },
    "--shiki-token-keyword": { light: "#A34E36", dark: "#E39A7B" },
    "--shiki-token-parameter": { light: "#93591F", dark: "#DDAF6C" },
    "--shiki-token-function": { light: "#8C5A31", dark: "#E8B183" },
    "--shiki-token-punctuation": { light: "#5E564B", dark: "#B4A899" },
    "--shiki-token-link": { light: "#3E6B74", dark: "#7FB3B8" },
    }
    /** theme.css + markdown.css: component patches and Markdown skin. */
    const PATCH_CSS = `/*
 * Cluade — component patches that a token layer cannot express (inlined into
 * client.js). Three groups:
 *   1. the macOS sidebar material (darwin only);
 *   2. selected-option fills (all platforms);
 *   3. the expanded reasoning/"thinking" block (all platforms).
 *
 * Why this needs CSS at all: the desktop main window uses native macOS vibrancy
 * (\`vibrancy: 'sidebar'\`, background \`#00000000\`) and the page is transparent on
 * darwin, so the window material shows through. ui-layout then paints the left
 * column with a cool blue-violet gradient over a partial sidebar fill:
 *   light:  color-mix(… sidebar-fill 40%, transparent)  → ~39% warm, rest vibrancy
 *   dark:   color-mix(… sidebar-fill 50%, transparent)
 *   reduce: color-mix(… sidebar-fill 90%, transparent)   (prefers-reduced-transparency)
 * A token override can only reach that partial layer; it cannot remove the
 * gradient or the native material behind it, which is why the sidebar stayed
 * gray/blue.
 *
 * This rule repaints exactly that column with an opaque
 * \`--dsw-specific-sidebar-fill\` (light #F0ECE4 / dark #161311), replacing the
 * native material there. It is:
 *   - scoped to \`data-platform=darwin\`, so Web and Windows keep their shipped
 *     styling (the injected rule simply never matches);
 *   - matched on class-token boundaries of the CSS-module suffix \`_sidebarCol\`
 *     (\`[class$=…]\` or \`[class*=…' ']\`), so a future \`_sidebarCollapsed\` or
 *     \`_sidebarColRight\` class is not caught by accident;
 *   - removed with the plugin effect, which restores the shipped
 *     translucency/material immediately.
 * If a future DSH build renames the class or drops data-platform, the rule
 * stops matching and the sidebar falls back to the shipped gradient — a silent
 * visual downgrade, never a rendering failure.
 */
html[data-platform='darwin'] [class$='_sidebarCol'],
html[data-platform='darwin'] [class*='_sidebarCol '] {
  background: var(--dsw-specific-sidebar-fill);
}

html[data-platform='darwin'] body[data-ds-dark-theme] [class$='_sidebarCol'],
html[data-platform='darwin'] body[data-ds-dark-theme] [class*='_sidebarCol '] {
  background: var(--dsw-specific-sidebar-fill);
}

/*
 * 2) Selected options — ALL PLATFORMS (no darwin scope).
 * DSH paints hover and selection in lists/menus with the same
 * \`--dsw-alias-interactive-bg-hover\` token, so a selected row reads as a light
 * gray wash. The reference uses a distinctly deeper warm fill for the selected
 * item. These rules touch only the "selected" state, never plain hover.
 * Coverage note: only menus rendered with the "fill" selection style get
 * \`_selectedFill\`; "check" style menus keep their glyph only (by design).
 *
 * Class suffixes are CSS-module names: \`_selectedFill\` is the menu item fill
 * (ui-primitives Menu), \`_sessionRow\`/\`_searchResultRow\` are the workspace
 * rows (ui-workspace), \`_panelRow\` + \`_panelActive\` is the sidebar panel row
 * (ui-sidebar), \`_themeCube\` + \`_selected\` is the Appearance cube (ui-theme).
 */
body [class*='_selectedFill'],
body [class*='_selectedFill']:hover:not(:disabled),
body [class*='_selectedFill']:focus-visible:not(:disabled) {
  background: var(--cluade-selected-fill, var(--dsw-alias-bg-module-platform));
}

body [class*='_sessionRow'][class*='_selected'],
body [class*='_searchResultRow'][class*='_selected'],
body [class*='_panelRow'][class*='_panelActive'],
body [class*='_themeCube'][class*='_selected'] {
  background: var(--cluade-selected-fill, var(--dsw-alias-bg-module-platform));
}

body [class*='_themeCube'][class*='_selected'] {
  border-color: color-mix(in srgb, var(--cluade-selected-fill) 70%, var(--dsw-alias-state-business-primary));
}

/*
 * 3) Reasoning ("thinking") output — ALL PLATFORMS (no darwin scope).
 * The shipped reasoning disclosure has no surface of its own: expanded
 * chain-of-thought text sits directly on the conversation canvas. Give the
 * expanded block the reference's section look: a visible warm border plus a
 * slightly deeper warm fill. This is the only patch that adds geometry
 * (padding/margin/border/radius); the token layer alone stays geometry-free.
 * The disclosure header is sticky inside the block and ships with
 * \`background: bg-base\`, so it must follow the same fill or it would show as a
 * lighter band while scrolling.
 */
body [class*='_root'][data-variant='think'][data-expanded] {
  box-sizing: border-box;
  margin: 4px 0;
  padding: 6px 10px;
  background: var(--cluade-reasoning-fill, var(--dsw-alias-bg-layer-2));
  border: 1px solid var(--cluade-reasoning-border, var(--dsw-alias-border-l3));
  border-radius: var(--dsw-radius-md);
}

body [class*='_root'][data-variant='think'][data-expanded] [data-disclosure-header] {
  background: var(--cluade-reasoning-fill, var(--dsw-alias-bg-layer-2));
}

/*
 * Cluade — Markdown reading skin (inlined into client.js after theme.css).
 *
 * Ported from the Ember Markdown reference
 * (/Users/temporary/source/workflow-skill/deepseek-harness-desktop/markdown-theme):
 * warm body text, a clear heading ladder (H2 with a hairline), terracotta
 * underlined links, warm inline-code chips, dark code blocks with a warm
 * banner, warm quote slabs and a bordered table with a tinted header.
 *
 * Scope: DSH renders Markdown through one shared primitive in BOTH the chat
 * transcript and the sidebar document preview; its root carries a CSS-module
 * class ending in \`_markdown\` (the compact variant adds \`_compact\`, which is
 * used by previews/tool surfaces and is intentionally left on DSH defaults).
 *
 * Colors come from \`--cluade-md-*\` / \`--cluade-md-syn-*\` custom properties
 * registered by the token layer, so light/dark follow the theme mode and the
 * palette stays the single color source. Reference-only extras that DSH's
 * renderer cannot emit (callouts, .lead/.caption, kbd, mark, details,
 * figcaption, footnotes, H7) are intentionally not simulated.
 */

/* ---------- base ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) {
  font-size: calc(var(--dsh-content-font-size, 14px) + 1px);
  line-height: 1.95;
  color: var(--cluade-md-text, var(--dsw-alias-label-primary));
  overflow-wrap: anywhere;
}

/* ---------- headings ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) :is(h1, h2, h3, h4, h5, h6) {
  color: var(--cluade-md-heading, var(--dsw-alias-label-primary));
  line-height: 1.45;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) h1 {
  margin: 0 0 20px;
  font-size: calc(32px + var(--dsh-content-font-delta, 0px));
  font-weight: 650;
  letter-spacing: -0.5px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) h2 {
  margin: 52px 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--cluade-md-border, var(--dsw-alias-border-l2));
  font-size: calc(25px + var(--dsh-content-font-delta, 0px));
  font-weight: 600;
  letter-spacing: -0.2px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) h3 {
  margin: 34px 0 14px;
  font-size: calc(21px + var(--dsh-content-font-delta, 0px));
  font-weight: 600;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) h4 {
  margin: 27px 0 12px;
  font-size: calc(18px + var(--dsh-content-font-delta, 0px));
  font-weight: 600;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) h5 {
  margin: 25px 0 10px;
  font-size: calc(16px + var(--dsh-content-font-delta, 0px));
  font-weight: 650;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) h6 {
  margin: 22px 0 8px;
  font-size: calc(14px + var(--dsh-content-font-delta, 0px));
  font-weight: 650;
}

/* ---------- text ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) p {
  margin: 0 0 18px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) strong {
  color: var(--cluade-md-strong, var(--dsw-alias-label-primary));
  font-weight: 600;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) a,
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_fileLink'] {
  color: var(--cluade-md-link, var(--dsw-alias-link));
  text-decoration: underline;
  text-decoration-color: var(--cluade-md-link-border, var(--dsw-alias-border-l3));
  text-underline-offset: 4px;
  transition: color 0.15s;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) a:hover,
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) a:focus {
  color: var(--cluade-md-link-hover, var(--dsw-alias-link));
  text-decoration-color: currentColor;
}

/* ---------- lists ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) :is(ul, ol) {
  margin: 16px 0 22px;
  padding-left: 24px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) li {
  margin: 7px 0;
  padding-left: 5px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) li::marker {
  color: var(--cluade-md-marker, var(--dsw-alias-label-secondary));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) li > :is(ul, ol) {
  margin: 6px 0;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) input[type='checkbox'] {
  width: 14px;
  height: 14px;
  margin: 0 8px 0 0;
  accent-color: var(--cluade-md-marker, var(--dsw-alias-label-secondary));
}

/* ---------- rule ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) hr {
  height: 1px;
  margin: 42px 0;
  border: none;
  background: var(--cluade-md-border, var(--dsw-alias-border-l2));
}

/* ---------- quotes ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) blockquote {
  margin: 24px 0;
  padding: 16px 22px;
  border-left: 3px solid var(--cluade-md-quote-border, var(--dsw-alias-border-l3));
  border-radius: 0 6px 6px 0;
  background: var(--cluade-md-quote-bg, var(--dsw-alias-bg-layer-2));
  color: var(--cluade-md-quote-text, var(--dsw-alias-label-secondary));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) blockquote p:last-child {
  margin-bottom: 0;
}

/* ---------- inline code ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) :not(pre) > code {
  padding: 2px 6px;
  border: 1px solid var(--cluade-md-inline-border, var(--dsw-alias-border-l2));
  border-radius: 4px;
  background: var(--cluade-md-inline-bg, var(--dsw-alias-markdown-inline-code));
  color: var(--cluade-md-inline-text, var(--dsw-alias-label-primary));
  font-family: var(--ds-font-family-code);
  font-size: 0.875em;
  line-height: 1.7;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) :is(h1, h2, h3, h4, h5, h6) code {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  font-family: var(--ds-font-family-code);
}

/* ---------- code blocks ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block {
  --dsl-code-block-border-radius: 8px;
  --dsl-code-block-background: var(--cluade-md-code-bg);
  --dsl-code-block-banner-background-color: var(--cluade-md-code-banner-bg);
  --shiki-background: var(--cluade-md-code-bg);
  --shiki-foreground: var(--cluade-md-code-text);
  --shiki-token-keyword: var(--cluade-md-syn-keyword);
  --shiki-token-string: var(--cluade-md-syn-string);
  --shiki-token-string-expression: var(--cluade-md-syn-string-expr);
  --shiki-token-comment: var(--cluade-md-syn-comment);
  --shiki-token-parameter: var(--cluade-md-syn-parameter);
  --shiki-token-function: var(--cluade-md-syn-function);
  --shiki-token-constant: var(--cluade-md-syn-constant);
  --shiki-token-punctuation: var(--cluade-md-syn-punctuation);
  --shiki-token-link: var(--cluade-md-syn-link);
  margin: 22px 0 24px;
  border: 1px solid var(--cluade-md-code-border, var(--dsw-alias-border-l3));
  border-radius: 8px;
  background: var(--cluade-md-code-bg, var(--dsw-alias-markdown-code-block));
  color: var(--cluade-md-code-text, var(--dsw-alias-label-primary));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block [class*='_bannerWrap'] {
  background-color: var(--cluade-md-code-banner-bg, var(--dsw-alias-markdown-code-block-banner));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block [class*='_infostring'],
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block [class*='_copyButton'] {
  color: var(--cluade-md-code-banner-text, var(--dsw-alias-label-secondary));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block :where(pre) {
  padding: 18px 22px 22px;
  background: var(--cluade-md-code-bg, var(--dsw-alias-markdown-code-block));
}
/*
 * Code text must be light on the dark block in BOTH palettes. Shiki-annotated
 * spans carry inline colors, but plain/unhighlighted blocks (\`_plain\`) keep the
 * shipped \`color: label-primary\`, which is a dark ink — on the dark block that
 * is unreadable. Paint every pre/code node explicitly; shiki spans still win
 * with their own inline token colors.
 */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block :is(pre, code) {
  color: var(--cluade-md-code-text, var(--dsw-alias-label-primary));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) .md-code-block [class*='_numbered'] code > .line::before {
  color: color-mix(in srgb, var(--cluade-md-code-text, #e0cdb4) 55%, transparent);
}

/* ---------- tables ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll']:not(.md-table-wide) {
  border: 1px solid var(--cluade-md-table-border, var(--dsw-alias-border-l2));
  border-radius: 7px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll']:not(.md-table-wide) > table {
  width: 100%;
  max-width: 100%;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] th {
  padding: 12px 16px;
  border-bottom: 1px solid var(--cluade-md-table-border, var(--dsw-alias-border-l2));
  background: var(--cluade-md-table-head-bg, var(--dsw-alias-bg-layer-2));
  color: var(--cluade-md-table-head-text, var(--dsw-alias-label-secondary));
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--cluade-md-table-cell-border, var(--dsw-alias-border-l1));
  font-size: 13px;
  line-height: 1.8;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] :is(th, td):first-child {
  padding-left: 16px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] td:last-child {
  padding-right: 16px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] tbody tr:nth-child(even) {
  background: var(--cluade-md-table-zebra, var(--dsw-alias-bg-layer-1));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] tbody tr:hover {
  background: var(--cluade-md-table-hover, var(--dsw-alias-interactive-bg-hover));
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) [class*='_tableScroll'] tr:last-child td {
  border-bottom: 0;
}

/* ---------- images and selection ---------- */
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
body [class*='_markdown']:not([class*='_compact']):not([class*='_1wejo']) ::selection {
  background: var(--cluade-md-selection-bg, var(--dsw-alias-bg-document-selection));
  color: var(--cluade-md-selection-text, var(--dsw-alias-label-primary));
}`

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
