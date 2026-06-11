---
name: toui-shorten
description: Create toui.io short links and read their click stats from the command line. Use when the user wants to shorten a URL, make a short link, generate a tracking link, or check how many clicks/visitors a toui.io short code has received. Requires a TOUI_API_KEY environment variable.
license: MIT
compatibility: Requires internet access, Node.js >= 18, and a TOUI_API_KEY environment variable.
metadata:
  version: "1.0"
  homepage: https://toui.io
---

# toui-shorten

Shorten URLs and read click analytics via [toui.io](https://toui.io).

## Setup (once)

1. Create a `full`-scope API key at <https://toui.io/admin> → API keys.
2. Export it: `export TOUI_API_KEY=toui_xxxxxxxx`
3. From this skill's directory, install the dependency once: `npm install`

## Shorten a URL

Run the bundled script (do not reimplement in your context):

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/shorten.mjs" shorten "<url>" "[optional title]"
```

It prints JSON: `{ "short_url": "...", "short_code": "...", "target_url": "...", "created_at": "..." }`. Give the user the `short_url`.

## Check click stats

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/shorten.mjs" stats "<short_code>" "[days]"
```

Prints `total_clicks`, a `daily` array, and country/referrer/device breakdowns (breakdowns depend on the plan). The `days` window is capped by the plan's retention.

## Notes

- If `${CLAUDE_PLUGIN_ROOT}` is not set (e.g. the skill was dropped into `~/.claude/skills`), run the script by its path within this skill directory instead.
- On error the script prints the message and an HTTP status; a `401` means the key is missing/invalid, `403` means scope/account issue.
- toui also works fully hands-free over MCP (`https://mcp.toui.io`) and in Telegram — see <https://toui.io/docs>.
