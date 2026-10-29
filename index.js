/**
 * Cluade — Host-side half of the plugin.
 *
 * Everything visual lives in the Client entry (`./client`): it registers a
 * token override layer through `ctx.theme`, which only exists in the browser.
 * The Host entry has nothing to do beyond being a valid Cordis plugin so the
 * bundle patch can mount the row and the client composition can pick up the
 * accompanying `dsh.client` entry.
 */
export const name = 'dsh-theme-cluade'

export function apply() {}
