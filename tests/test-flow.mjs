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
assert.equal(eligible.headline, "Você já pode revisar a abertura");
assert.equal(eligible.stats[2].value, "Conta opcional");
assert.match(eligible.findings[0].title, /seu próximo passo/i);
assert.match(eligible.convertOverride.ctaLabel, /benefício elegível/i);

const planFirst = report({ reserva: "nao", prontidao: "nao", objetivo: "aprender" });
assert.equal(planFirst.headline, "Seu próximo passo vem antes da conta");
assert.equal(planFirst.stats[2].value, "Plano primeiro");
assert.match(planFirst.findings[0].text, /não precisa ser aberta agora/i);
assert.match(planFirst.convertOverride.ctaLabel, /consultar condições/i);
assert.equal(
  JSON.stringify(planFirst).includes("Ainda não estar pronto remove a oferta"),
  false,
  "a página não pode contradizer a regra comercial atual"
);

const existingAccount = report({ jaTemBinance: "sim" });
assert.equal(existingAccount.convertOverride, null, "cliente existente não recebe CTA de conta nova");
assert.equal(existingAccount.headline, "Fortaleça a conta que já existe");
assert.equal(existingAccount.stats[2].value, "Revisar segurança");

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
        // Regra do operador (20/07/2026): a trava cobre somente quem já tem
        // conta — e país, onde a pergunta existir. Reserva, prontidão e
        // objetivo mudam o texto da oferta, não a existência dela.
        const shouldOffer = jaTemBinance === "nao";
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
  "ainda não estar pronto remove a oferta",
];
for (const claim of prohibited) {
  assert.equal(
    source.toLowerCase().includes(claim.toLowerCase()),
    false,
    `claim proibido encontrado: ${claim}`
  );
}

assert.equal(/value:\s*eligible\s*\?\s*"Conta elegível"/.test(source), false, "resultado não pode afirmar elegibilidade externa");
assert.equal(/tgLabel|tgPrefill|publicTelegram/.test(source), false, "fluxo não deve prometer contato");
console.log("Flow matrix: OK — 24 combinações, próximo passo explícito e claims revisados");
