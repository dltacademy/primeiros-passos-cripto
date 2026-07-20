import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const index = fs.readFileSync(new URL("index.html", root), "utf8");
const engine = fs.readFileSync(new URL("js/flow-engine.js", root), "utf8");
const trackingSource = fs.readFileSync(new URL("js/tracking.js", root), "utf8");
const configSource = fs.readFileSync(new URL("config.js", root), "utf8");
const workflows = [
  fs.readFileSync(new URL(".github/workflows/pages.yml", root), "utf8"),
  fs.readFileSync(new URL(".github/workflows/ci.yml", root), "utf8"),
].join("\n");

assert.match(index, /<meta name="robots" content="noindex">/);
assert.match(index, /<meta name="referrer" content="no-referrer">/);
assert.match(index, /Content-Security-Policy/);
assert.equal(index.includes("unsafe-inline"), false);
assert.equal(index.includes("unsafe-eval"), false);
assert.equal(index.includes("meta name=\"keywords\""), false);
assert.match(index, /<script src="js\/bootstrap\.js"><\/script>/);
assert.equal(/<script>(.|\n)*?<\/script>/.test(index), false, "não deve existir JS executável inline");

const jsonLdMatch = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(jsonLdMatch, "JSON-LD precisa existir");
const jsonLd = JSON.parse(jsonLdMatch[1]);
assert.equal(jsonLd["@type"], "WebApplication");
assert.equal(jsonLd.url, "https://primeiros-passos-cripto.dlt.academy/");

assert.equal(engine.includes("innerHTML"), false, "engine deve usar DOM seguro");
assert.equal(engine.includes("report.html"), false, "report.html não é suportado");
assert.match(engine, /sponsored nofollow noopener noreferrer/);
assert.match(engine, /referrerPolicy = "no-referrer"/);

for (const line of workflows.split("\n")) {
  const match = line.match(/uses:\s*[^@\s]+@([^\s#]+)/);
  if (match) assert.match(match[1], /^[0-9a-f]{40}$/, `Action não fixada: ${line}`);
}

assert.match(configSource, /telegramUsername:\s*""/);
assert.equal(/chamada|revis[aã]o personalizada/i.test(configSource), false);

const sandbox = {
  URL,
  URLSearchParams,
  CONFIG: {
    refDefault: "https://example.com/ref/default",
    refByChannel: { yt: "https://example.com/ref/youtube" },
    offers: { default: { url: "https://example.com/ref/default" } },
    telegramUsername: "",
    goatCounterSite: "",
  },
  window: { location: { search: "?c=yt&v=grupo_2026" } },
  document: { createElement() {}, head: { appendChild() {} } },
};
vm.runInNewContext(
  `${trackingSource}\nglobalThis.__TRACKING__ = { getChannel, getVariant, getSafeExternalUrl, getRefLink };`,
  sandbox
);
const tracking = sandbox.__TRACKING__;
assert.equal(tracking.getChannel(), "yt");
assert.equal(tracking.getVariant(), "grupo_2026");
assert.equal(tracking.getRefLink(), "https://example.com/ref/youtube");
assert.equal(tracking.getSafeExternalUrl("http://example.com"), "#");
assert.equal(tracking.getSafeExternalUrl("javascript:alert(1)"), "#");

sandbox.window.location.search = "?c=%3Cscript%3E&v=variante%20inválida";
assert.equal(tracking.getChannel(), null);
assert.equal(tracking.getVariant(), "a");
assert.equal(tracking.getRefLink(), "https://example.com/ref/default");

for (const source of [engine, trackingSource]) {
  assert.equal(/localStorage|sessionStorage|document\.cookie/.test(source), false);
}

console.log("Technical contract: OK — metadata, CSP, DOM, links, tracking and workflows");
