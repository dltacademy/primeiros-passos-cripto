# Primeiros Passos no Cripto

Ferramenta educacional para organizar reserva, segurança, prontidão e comportamento antes de abrir uma conta ou fazer o primeiro aporte em cripto.

O fluxo usa oito respostas para produzir um plano personalizado. A oferta afiliada aparece somente para quem informou que ainda não possui Binance. Reserva, prontidão e objetivo definem se a conta é o próximo passo ou apenas uma opção para consultar depois.

Quem já possui Binance recebe um plano voltado à segurança da conta existente, sem CTA de nova conta.

## Estado de publicação

A ferramenta está publicada em `index, follow`, conectada ao portal e disponível em:

`https://primeiros-passos-cripto.dlt.academy/`

Antes de direcionar verba paga, o gate mínimo é:

1. revisar os três resultados centrais — conta existente, plano antes da conta e pessoa pronta para revisar cadastro;
2. validar desktop e celular, incluindo hierarquia do resultado e CTA;
3. revisar teclado, foco, console, copiar plano e download do card;
4. confirmar que canal e variante permitidos chegam ao tracking e ao link afiliado;
5. começar com orçamento pequeno e regra de parada definida.

A publicação orgânica não depende de campanha paga. Atribuição e leitura do painel afiliado gateiam escala, não a utilidade pública da ferramenta.

## Arquitetura

- HTML/CSS/JavaScript vanilla;
- zero backend, zero build e zero dependência externa nova;
- respostas processadas somente no navegador;
- CSP restritiva e JavaScript executável somente em arquivos externos;
- tracking opcional por `?c=<canal>&v=<variante>` com parâmetros sanitizados;
- contato público desabilitado enquanto `telegramUsername` estiver vazio.

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
