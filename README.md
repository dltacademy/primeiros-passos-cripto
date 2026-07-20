# Primeiros Passos no Cripto

Ferramenta educacional para organizar reserva, segurança, prontidão e comportamento antes de abrir uma conta ou fazer o primeiro aporte em cripto.

O fluxo usa oito respostas para produzir um plano personalizado. A oferta afiliada só aparece quando a pessoa:

- informou que ainda não possui Binance;
- já possui uma reserva para imprevistos compatível com seus gastos;
- declarou prontidão para revisar o cadastro;
- quer avançar além do estudo.

Cliente Binance, pessoa sem reserva, pessoa sem prontidão e quem quer apenas aprender recebem um plano completo sem CTA comercial.

## Estado de publicação

A ferramenta permanece acessível para revisão, com indexação bloqueada por `<meta name="robots" content="noindex">`. O `robots.txt` usa `Allow: /` para que o crawler consiga ler essa diretiva.

Não liberar indexação, divulgar ou escalar antes de:

1. validar todos os caminhos em desktop e celular;
2. revisar teclado, foco, console, copiar plano e download do card;
3. abrir o link afiliado em sessão deslogada e confirmar benefício, país e elegibilidade;
4. confirmar um cadastro atribuível no painel;
5. aprovar o conteúdo e fazer merge deliberado.

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

O portal e o sitemap não são alterados neste lote. A integração pública deve ser revisada separadamente depois do gate da ferramenta.
