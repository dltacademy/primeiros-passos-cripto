# Primeiros Passos no Cripto — seu plano de entrada em 6 perguntas

Responda 6 perguntas rápidas e receba um plano passo-a-passo personalizado pra começar em cripto com segurança — sem cadastro, roda no seu navegador.

Construído com o [ferramenta-kit](https://github.com/tiagolucer/ferramenta-kit) — página única, zero backend, zero build.

## Antes de divulgar

1. Copiar `config.example.js` → `config.js` e preencher: links ref por canal, username do Telegram, código do GoatCounter.
2. Gerar `og-image.jpg` (1200x630) — pode usar `generateCard({format:"og", ...})` do `js/canvas-cards.js` e salvar o resultado.
3. Habilitar GitHub Pages no repo (Settings → Pages → Source: GitHub Actions).
4. Testar local: `python3 -m http.server 8000`.
5. Divulgar com `?c=<canal>` em cada lugar diferente pra rastrear conversão por origem.

## Estrutura

Ver o [README do kit](https://github.com/tiagolucer/ferramenta-kit) pra entender o padrão completo.
