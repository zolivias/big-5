import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Path Five landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Path Five/);
  assert.match(html, /Five traits/);
  assert.match(html, /Your path/);
  assert.match(html, /Discover your traits/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders all public information routes", async () => {
  for (const path of ["/methodology", "/support", "/privacy", "/disclaimer", "/assessment", "/results", "/preferences", "/toolkit"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), /Path Five/i, path);
  }
});
