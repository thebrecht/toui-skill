# toui-skill

[![smithery badge](https://smithery.ai/badge/toui-io/url-shortener)](https://smithery.ai/servers/toui-io/url-shortener)

Use [toui.io](https://toui.io) — the URL shortener — from your AI tools.

## Fastest: MCP (no API key, OAuth)

toui runs a remote MCP server at **`https://mcp.toui.io`**. Add it to any MCP-capable agent:

- **Cursor** — [![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=toui&config=eyJ1cmwiOiJodHRwczovL21jcC50b3VpLmlvIn0=)
- **Claude / ChatGPT** — add a custom connector with URL `https://mcp.toui.io` ([guide](https://toui.io/blog/connect-toui-to-claude-and-chatgpt)).
- **Cline** — "Add server" → `https://mcp.toui.io`.
- **OpenClaw** — `openclaw mcp add toui --url https://mcp.toui.io --transport streamable-http --auth oauth`

The MCP server exposes one tool: `shorten_url`.

> **OpenClaw manual-login tip:** if you complete the OAuth page and then paste the code into
> `openclaw mcp login toui --code <code>` and it returns *"Invalid authorization code format"*,
> the code was copied from the browser address bar still URL-encoded — replace every `%3A` with
> a colon `:` and paste again. (Auto-capture clients like Cursor, Cline, Claude, and ChatGPT
> decode this for you, so they never hit it.)

## Agent Skill (shorten + stats, for Claude Code / code-exec agents)

Installs a `toui-shorten` skill that calls the toui REST API directly (needs an API key, adds click stats):

```
/plugin marketplace add thebrecht/toui-skill
/plugin install toui-shorten@toui
```

Then set a `full`-scope API key from <https://toui.io/admin> :

```
export TOUI_API_KEY=toui_xxxxxxxx
```

See [`skills/toui-shorten`](skills/toui-shorten). The script is [`scripts/shorten.mjs`](scripts/shorten.mjs).

## Links

- API docs: <https://toui.io/docs>
- SDK: [`toui-js`](https://www.npmjs.com/package/toui-js)
