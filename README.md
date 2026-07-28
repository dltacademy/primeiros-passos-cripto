# Primeiros Passos no Cripto

Ferramenta educacional para organizar reserva, segurança, prontidão e comportamento antes de abrir uma conta ou fazer o primeiro aporte em cripto.

O fluxo usa oito respostas para produzir um plano personalizado. A oferta afiliada só aparece quando a pessoa:

- informou que ainda não possui Binance;
- já possui uma reserva para imprevistos compatível com seus gastos;
- declarou prontidão para revisar o cadastro;
- quer avançar além do estudo.

Cliente Binance, pessoa sem reserva, pessoa sem prontidão e quem quer apenas aprender recebem um plano completo sem CTA comercial.

## Estado de publicação

**No ar e indexável** em `https://primeiros-passos-cripto.dlt.academy/`, servindo `<meta name="robots" content="index, follow">` desde o commit `7f6f1d2`. O `robots.txt` mantém `Allow: /`.

Antes de escalar divulgação ou verba paga, continua valendo:

1. abrir o link afiliado em sessão deslogada e confirmar benefício, país e elegibilidade;
2. confirmar um cadastro atribuível no painel.

## Arquitetura

- HTML/CSS/JavaScript vanilla;
- zero backend, zero build e zero dependência externa nova;
- respostas processadas somente no navegador;
- CSP restritiva e JavaScript executável somente em arquivos externos;
- tracking opcional por `?c=<canal>&v=<variante>` com parâmetros sanitizados;
- nenhum contato pessoal exposto: a ferramenta não pede nem armazena dado de contato.

## Testes

```bash
python3 -m py_compile security_check.py
python3 security_check.py .
node --check config.js
find js -name '*.js' -print0 | xargs -0 -n1 node --check
node tests/test-flow.mjs
node tests/test-contract.mjs
```

O workflow `Validate` executa esses gates em pull requests. O deploy do GitHub Pages continua restrito a pushes em `main`.

## Domínio

URL canônica: `https://primeiros-passos-cripto.dlt.academy/`.

O portal e o sitemap não são alterados neste lote. A integração pública deve ser revisada separadamente depois do gate da ferramenta.
