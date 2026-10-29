/**
 * Minimal WCAG 2.1 contrast helpers shared by the theme generator and the
 * contrast audit. Colors must be opaque hex or rgb()/rgba() without alpha;
 * derived CSS values (var()/color-mix()) are rejected so a check can never
 * silently pass on an unresolved value.
 */

export function parseColor(value) {
  const text = String(value).trim()
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text)
  if (hex !== null) {
    const digits = hex[1].length === 3
      ? hex[1].split('').map((c) => c + c).join('')
      : hex[1]
    return {
      r: Number.parseInt(digits.slice(0, 2), 16),
      g: Number.parseInt(digits.slice(2, 4), 16),
      b: Number.parseInt(digits.slice(4, 6), 16),
    }
  }
  const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(text)
  if (rgb !== null) {
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) }
  }
  throw new Error(`cannot compute contrast for "${text}" — use an opaque hex or rgb() color`)
}

export function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const c = value / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrastRatio(fg, bg) {
  const a = relativeLuminance(parseColor(fg))
  const b = relativeLuminance(parseColor(bg))
  const [hi, lo] = a > b ? [a, b] : [b, a]
  return (hi + 0.05) / (lo + 0.05)
}
