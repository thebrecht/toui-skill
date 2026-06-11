---
name: toui-shorten-zh
description: 用 toui.io 建立短網址並查詢點擊統計。當使用者想縮短網址、產生短連結或追蹤連結、或查詢某個 toui.io 短碼的點擊數／訪客數時使用。需要環境變數 TOUI_API_KEY。
license: MIT
compatibility: 需要網路、Node.js >= 18、以及 TOUI_API_KEY 環境變數。
metadata:
  version: "1.0"
  homepage: https://toui.io
---

# toui-shorten（繁體中文）

透過 [toui.io](https://toui.io) 縮短網址並讀取點擊分析。

## 設定（一次）

1. 到 <https://toui.io/admin> → API keys 建立一把 `full` 權限的金鑰。
2. 設定環境變數：`export TOUI_API_KEY=toui_xxxxxxxx`
3. 在本 skill 目錄執行一次：`npm install`

## 縮短網址

執行內附腳本（不要在 context 裡重寫）：

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/shorten.mjs" shorten "<網址>" "[可選標題]"
```

會印出 JSON：`{ "short_url": "...", "short_code": "...", "target_url": "...", "created_at": "..." }`，把 `short_url` 回給使用者。

## 查詢點擊統計

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/shorten.mjs" stats "<短碼>" "[天數]"
```

會印出 `total_clicks`、`daily` 陣列，以及國家／來源／裝置分布（分布視方案而定）。`days` 區間受方案保留天數限制。

## 備註

- 若 `${CLAUDE_PLUGIN_ROOT}` 未設定（例如直接放進 `~/.claude/skills`），改用本 skill 目錄內的腳本路徑執行。
- 出錯時腳本會印出訊息與 HTTP 狀態；`401` 代表金鑰缺失／無效，`403` 代表權限或帳號問題。
- toui 也支援全程免動手的 MCP（`https://mcp.toui.io`），以及 LINE 與 Telegram 機器人——詳見 <https://toui.io/docs>。
