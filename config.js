const CONFIG = {
  refDefault: "https://www.binance.com/register?ref=BOSS2026",

  refByChannel: {
    grupos: "https://www.binance.com/register?ref=BOSS2026",
    whats: "https://www.binance.com/register?ref=BOSS2026",
    yt: "https://www.binance.com/register?ref=BOSS2026",
    bio: "https://www.binance.com/register?ref=BOSS2026",
    "tg-ads": "https://www.binance.com/register?ref=BOSS2026",
  },

  allowedVariants: ["a", "b"],

  offers: {
    default: {
      name: "Binance",
      url: "https://www.binance.com/register?ref=BOSS2026",
      code: "BOSS2026",
    },
  },

  // Próximo passo do funil. Aresta única de saída desta ferramenta — o grafo
  // completo continua sendo do portal; aqui declara-se só o destino, para não
  // duplicar o registry em cada repositório de ferramenta.
  // Link INTERNO do domínio: nunca recebe sponsored/nofollow nem target=_blank.
  // Copy neutra de propósito: este bloco é o mesmo nos dois ramos de
  // elegibilidade, então não pode dizer "antes de abrir a conta" — para quem
  // já tem conta, o guia serve para revisar a proteção do que já existe.
  nextStep: {
    url: "https://dlt.academy/guias/conta-binance/",
    tag: "Guia interativo",
    headline: "Conta segura: o passo que evita a maior parte dos prejuízos",
    sub: "Cadastro, verificação e proteção com passkey — um passo por vez. Serve tanto para abrir uma conta quanto para revisar uma que já existe, sem compartilhar senha ou código com ninguém.",
    ctaLabel: "Abrir o guia de conta segura →",
  },

  // Comunidade oficial da marca. Entra como brinde ao lado da oferta e, no
  // ramo sem oferta, sustenta sozinha a continuação gratuita.
  // Nunca é contato pessoal: sempre grupo público.
  community: {
    url: "https://t.me/dltacademy",
    label: "Entrar grátis no grupo →",
    tag: "Grátis",
    headline: "Continue com quem está no mesmo caminho",
    sub: "Grupo aberto da DLT Academy: dúvidas, conteúdos novos e avisos de golpe. Sem custo e sem cadastro.",
  },
  goatCounterSite: "",
  siteUrl: "https://primeiros-passos-cripto.dlt.academy/",
  brand: "dltacademy",
};
