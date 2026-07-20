import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../js/flow.js", import.meta.url), "utf8");
const sandbox = {};
vm.runInNewContext(`${source}\nglobalThis.__FLOW__ = FLOW;`, sandbox);
const flow = sandbox.__FLOW__;

const base = {
  experiencia: "nunca",
  jaTemBinance: "nao",
  objetivo: "longo-prazo",
  valorMensal: 200,
  reserva: "sim",
  prontidao: "sim",
  medo: "complexidade",
  reacaoQueda: "espera",
};

function report(overrides = {}) {
  return flow.buildReport({ ...base, ...overrides });
}

const eligible = report();
assert.ok(eligible.convertOverride, "conta nova pronta deve receber uma oferta contextual");
assert.match(
  JSON.stringify(eligible.convertOverride),
  /cashback vitalício em parte das taxas elegíveis/i
);
assert.match(JSON.stringify(eligible.convertOverride), /contas novas e elegíveis/i);

const binanceAnswers = ["sim", "nao"];
const reserveAnswers = ["sim", "nao"];
const readinessAnswers = ["sim", "nao"];
const objectives = ["longo-prazo", "diversificar", "aprender"];
let combinations = 0;
for (const jaTemBinance of binanceAnswers) {
  for (const reserva of reserveAnswers) {
    for (const prontidao of readinessAnswers) {
      for (const objetivo of objectives) {
        combinations += 1;
        const result = report({ jaTemBinance, reserva, prontidao, objetivo });
        const shouldOffer =
          jaTemBinance === "nao" &&
          reserva === "sim" &&
          prontidao === "sim" &&
          objetivo !== "aprender";
        assert.equal(
          Boolean(result.convertOverride),
          shouldOffer,
          `roteamento incorreto: Binance=${jaTemBinance}, reserva=${reserva}, prontidão=${prontidao}, objetivo=${objetivo}`
        );
      }
    }
  }
}
assert.equal(combinations, 24);

const expectedFields = [
  "experiencia",
  "jaTemBinance",
  "objetivo",
  "valorMensal",
  "reserva",
  "prontidao",
  "medo",
  "reacaoQueda",
];
const actualFields = Array.from(flow.steps, (step) =>
  Array.from(step.fields, (field) => field.id)
).flat();
assert.deepEqual(actualFields, expectedFields, "a matriz deve cobrir todos os campos publicados");

const variants = {
  experiencia: "conta-outra",
  jaTemBinance: "sim",
  objetivo: "aprender",
  valorMensal: 350,
  reserva: "nao",
  prontidao: "nao",
  medo: "golpes",
  reacaoQueda: "vende",
};
const baseline = JSON.stringify(eligible);
for (const [field, value] of Object.entries(variants)) {
  assert.notEqual(
    JSON.stringify(report({ [field]: value })),
    baseline,
    `a resposta ${field} precisa alterar relatório, plano ou roteamento`
  );
}

const prohibited = [
  "sem volatilidade",
  "jeito mais seguro",
  "100% em stablecoin",
  "2–3 meses",
  "proibido",
  "padrão nº 1",
  "cashback em toda taxa",
  "sem prazo de validade",
  "pra sempre",
  "chamada de 15min",
  "revisar meu plano",
];
for (const claim of prohibited) {
  assert.equal(
    source.toLowerCase().includes(claim.toLowerCase()),
    false,
    `claim proibido encontrado: ${claim}`
  );
}

assert.equal(/tgLabel|tgPrefill|publicTelegram/.test(source), false, "fluxo não deve prometer contato");
console.log("Flow matrix: OK — 24 combinações centrais, 8 campos e claims revisados");
