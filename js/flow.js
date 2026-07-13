// ============================================================
// EXEMPLO — "Primeiros Passos no Cripto"
// Guia de entrada + preparo psicológico, num fluxo só (as duas ideias
// do Tiago combinadas). Serve de referência de schema — ver FRAMEWORK.md.
// Edite/substitua livremente pra outra ferramenta de fluxo.
// ============================================================

const OBJETIVO_LABEL = {
  "longo-prazo": "investidor de longo prazo",
  "renda-extra": "buscando renda extra",
  aprender: "só aprendendo por enquanto",
};

const FLOW = {
  slug: "primeiros-passos-cripto",
  reportTitle: "Seu plano de entrada",
  reportLabel: "Gerar meu plano →",

  steps: [
    {
      title: "Seu perfil",
      description: "Pra montar um plano que faz sentido pra você.",
      fields: [
        {
          id: "experiencia",
          label: "Sua experiência com cripto hoje",
          type: "radio",
          required: true,
          options: [
            { value: "nunca", label: "Nunca comprei" },
            { value: "conta-outra", label: "Já tenho conta em outra corretora" },
            { value: "ja-invisto", label: "Já invisto em outras coisas" },
          ],
        },
        {
          id: "objetivo",
          label: "Seu objetivo principal",
          type: "radio",
          required: true,
          options: [
            { value: "longo-prazo", label: "Investir a longo prazo" },
            { value: "renda-extra", label: "Renda extra" },
            { value: "aprender", label: "Só aprender por enquanto" },
          ],
        },
      ],
    },
    {
      title: "Recursos",
      description: "Sem pressa — o plano se ajusta ao que você tem.",
      fields: [
        {
          id: "valorMensal",
          label: "Quanto pretende aportar por mês",
          type: "range",
          min: 50,
          max: 2000,
          step: 50,
          value: 200,
          format: (v) => "R$ " + v,
        },
        {
          id: "reserva",
          label: "Você tem reserva de emergência de ~3 meses de gastos?",
          type: "radio",
          required: true,
          options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
          ],
        },
      ],
    },
    {
      title: "Sua cabeça",
      description: "Gestão de risco começa aqui, não na planilha.",
      fields: [
        {
          id: "medo",
          label: "O que mais te trava em relação a cripto?",
          type: "radio",
          required: true,
          options: [
            { value: "perder", label: "Medo de perder dinheiro" },
            { value: "golpes", label: "Medo de cair em golpe" },
            { value: "complexidade", label: "Parece complicado demais" },
            { value: "nenhum", label: "Nada, só não comecei ainda" },
          ],
        },
        {
          id: "reacaoQueda",
          label: "O mercado caiu 30% de repente. O que você faz?",
          type: "radio",
          required: true,
          options: [
            { value: "vende", label: "Vendo tudo, não aguento ver caindo" },
            { value: "espera", label: "Espero, não mexo em nada" },
            { value: "compra", label: "Aproveito pra comprar mais barato" },
          ],
        },
      ],
    },
  ],

  buildReport(a) {
    const plan = [];
    const findings = [];

    if (a.reserva === "nao") {
      findings.push({
        severity: 3,
        title: "Cripto vem DEPOIS da reserva",
        text: "Investir sem 3 meses de reserva de emergência significa que qualquer imprevisto te obriga a vender no pior momento. Resolva isso primeiro — o plano abaixo já conta com isso.",
      });
      plan.push({
        title: "Montar reserva de emergência",
        text: "Antes do primeiro aporte em cripto: separe ~3 meses de gastos essenciais num lugar de fácil acesso (poupança, CDB liquidez diária).",
      });
    }

    plan.push({ title: "Criar conta na corretora", text: "Use o link com desconto de taxa no final desta página." });
    plan.push({ title: "Verificação de identidade (KYC)", text: "Documento + selfie — libera os limites de depósito e saque." });
    plan.push({ title: "Ativar autenticação de dois fatores (2FA)", text: "Google Authenticator ou similar. Sem isso, não deposite nada." });

    if (a.medo === "golpes") {
      plan.push({
        title: "Configurar código anti-phishing",
        text: "Nas configurações de segurança da conta — todo e-mail real da corretora vai trazer esse código; e-mail sem ele é golpe.",
      });
      plan.push({
        title: "Regra de ouro contra golpe",
        text: "Nunca clique em link de 'suporte' que chegou por DM/WhatsApp. Acesse a corretora sempre digitando o endereço você mesmo ou pelo app oficial.",
      });
    }

    plan.push({ title: "Primeiro Pix pequeno", text: "Deposite um valor de teste (ex.: R$50) só pra entender o fluxo antes de comprometer mais dinheiro." });
    plan.push({ title: "Primeira compra em stablecoin", text: "Compre uma stablecoin (USDT/USDC) primeiro — sem volatilidade, é o jeito mais seguro de aprender a mecânica de compra/venda." });

    if (a.medo === "perder") {
      plan.push({
        title: "1º mês 100% em stablecoin",
        text: "Fique só em stablecoin no primeiro mês. Aprenda o fluxo (comprar, ver saldo, transferir) sem o estresse da variação de preço.",
      });
    }

    plan.push({
      title: `Rotina de aporte mensal de R$ ${a.valorMensal}`,
      text: "Aporte fixo, mesma data todo mês — o valor importa menos que a consistência.",
    });

    if (a.reacaoQueda === "compra") {
      plan.push({
        title: "Separar munição em stablecoin",
        text: "Reserve uma fração do aporte mensal em stablecoin parado, esperando quedas fortes pra comprar mais barato.",
      });
    }

    if (a.reacaoQueda === "vende") {
      findings.push({
        severity: 2,
        title: "Risco de vender no pânico",
        text: "Sua resposta indica reação emocional forte a quedas — é o padrão nº 1 que faz gente perder dinheiro em cripto (vender barato, comprar caro).",
      });
      plan.push({
        title: "Regra das 24 horas",
        text: "Em dia de queda forte, proibido decidir qualquer coisa (vender, comprar, mexer). Espere 24h com a cabeça fria antes de agir.",
      });
    }

    if (a.medo !== "nenhum") {
      plan.push({
        title: "Rotina psicológica: checar no máximo 1x/semana",
        text: "Checar o preço várias vezes ao dia alimenta ansiedade e decisões ruins. Escolha um dia fixo da semana pra olhar.",
      });
    }

    if (a.experiencia === "nunca") {
      plan.push({
        title: "Evoluir pra BTC/ETH depois de 2–3 meses",
        text: "Só depois de já ter a rotina de aporte rodando tranquila em stablecoin, considere alocar parte em Bitcoin/Ethereum.",
      });
    }

    return {
      headline: `${plan.length} passos`,
      sublabel: `Plano pra quem está ${OBJETIVO_LABEL[a.objetivo] || "começando"}`,
      tone: "good",
      stats: [
        { value: "R$ " + a.valorMensal, label: "aporte mensal" },
        { value: plan.length, label: "passos no plano" },
        { value: OBJETIVO_LABEL[a.objetivo] || "—", label: "perfil" },
      ],
      findings,
      plan,
      shareCard: {
        eyebrow: "MEU PLANO DE ENTRADA NO CRIPTO",
        headline: `${plan.length} passos`,
        lines: [`R$ ${a.valorMensal}/mês · ${OBJETIVO_LABEL[a.objetivo] || ""}`, "Educacional — não é promessa de retorno"],
        headlineColor: "#4ade80",
      },
    };
  },

  convert: {
    tag: "Pronto pro passo 1?",
    headline: "Abra a conta com desconto de taxa",
    sub: "O mesmo link que já está no passo 1 do seu plano.",
    offers: [
      "Desconto de taxa permanente",
      "Chamada de 15min pra revisar seu plano junto comigo",
      "Sem sinais, sem promessa de lucro — só o próximo passo certo",
    ],
    ctaLabel: "Abrir conta com desconto →",
    tgLabel: "💬 Revisar meu plano",
    tgPrefill: "Vim pelo guia de primeiros passos — quero revisar meu plano",
  },
};
