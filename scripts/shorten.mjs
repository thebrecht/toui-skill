import { Toui } from 'toui-js';

/**
 * @param {string[]} args  e.g. ['shorten', '<url>', '[title]'] or ['stats', '<code>', '[days]']
 * @param {{ apiKey?: string, fetch?: typeof fetch }} [deps]
 * @returns {Promise<object>} the toui-js result object
 */
export async function run(args, deps = {}) {
  const [cmd, ...rest] = args;
  // Validate args BEFORE constructing the client, so a usage error surfaces
  // even when TOUI_API_KEY is also missing (the constructor throws on a
  // missing key, which would otherwise mask the more useful usage message).
  const makeClient = () =>
    new Toui({ apiKey: deps.apiKey ?? process.env.TOUI_API_KEY, fetch: deps.fetch });

  if (cmd === 'shorten') {
    const [url, title] = rest;
    if (!url) throw new Error('usage: shorten <url> [title]');
    return await makeClient().shorten(title ? { url, title } : { url });
  }
  if (cmd === 'stats') {
    const [code, days] = rest;
    if (!code) throw new Error('usage: stats <code> [days]');
    // Only pass a positive, finite day count — never send days: NaN.
    const n = Number(days);
    const opts = days && Number.isFinite(n) && n > 0 ? { days: n } : {};
    return await makeClient().stats(code, opts);
  }
  throw new Error(`unknown command: ${cmd}`);
}

// CLI entry — only runs when executed directly, not when imported by tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  run(process.argv.slice(2))
    .then((r) => console.log(JSON.stringify(r, null, 2)))
    .catch((e) => {
      console.error(e.message + (e.status ? ` (HTTP ${e.status})` : ''));
      process.exit(1);
    });
}
