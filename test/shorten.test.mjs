import { test } from 'node:test';
import assert from 'node:assert/strict';
import { run } from '../scripts/shorten.mjs';

// Fake fetch that records the request and returns a canned JSON body.
function fakeFetch(body, status = 200) {
  return async (url, init) => {
    fakeFetch.lastUrl = String(url);
    fakeFetch.lastInit = init;
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  };
}

test('shorten returns the created short_url', async () => {
  const fetch = fakeFetch({
    short_url: 'https://toui.io/abc123',
    short_code: 'abc123',
    target_url: 'https://example.com/long',
    created_at: '2026-06-11T00:00:00Z',
  }, 201);
  const res = await run(['shorten', 'https://example.com/long', 'My link'], {
    apiKey: 'toui_test',
    fetch,
  });
  assert.equal(res.short_url, 'https://toui.io/abc123');
  assert.equal(res.short_code, 'abc123');
});

test('stats returns total_clicks for a code', async () => {
  const fetch = fakeFetch({
    short_code: 'abc123',
    total_clicks: 42,
    daily: [{ date: '2026-06-10', clicks: 42, unique_visitors: 30 }],
    limited: false,
  });
  const res = await run(['stats', 'abc123', '7'], { apiKey: 'toui_test', fetch });
  assert.equal(res.total_clicks, 42);
});

test('unknown command throws', async () => {
  await assert.rejects(
    () => run(['frobnicate'], { apiKey: 'toui_test', fetch: fakeFetch({}) }),
    /unknown command/,
  );
});

test('shorten without url throws usage', async () => {
  await assert.rejects(
    () => run(['shorten'], { apiKey: 'toui_test', fetch: fakeFetch({}) }),
    /usage/,
  );
});
