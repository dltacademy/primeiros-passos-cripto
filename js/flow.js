const EXPERIENCIA_LABEL = {
  nunca: "começando do zero",
  "conta-outra": "já usa outra corretora",
  "ja-invisto": "já investe fora de cripto",
};

const OBJETIVO_LABEL = {
  "longo-prazo": "construir uma posição de longo prazo",
  diversificar: "diversificar parte do patrimônio",
  aprender: "aprender antes de decidir",
};

const FLOW = {
  slug: "primeiros-passos-cripto",
  reportTitle: "Seu plano de entrada",
  reportLabel: "Gerar meu plano →",

  steps: [
    {
      title: "Seu ponto de partida",
      description: "As respostas servem para organizar o plano, não para pressionar uma abertura de conta.",
      fields: [
        {
          id: "experiencia",
          label: "Sua experiência com cripto hoje",
          type: "radio",
          required: true,
          options: [
            { value: "nunca", label: "Nunca comprei" },
            { value: "conta-outra", label: "Já tenho conta em outra corretora" },
            { value: "ja-invisto", label: "Já invisto em outros ativos" },
          ],
        },
        {
          id: "jaTemBinance",
          label: "Você já possui uma conta Binance?",
          type: "radio",
          required: true,
          options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
          ],
        },
        {
          id: "objetivo",
          label: "Seu objetivo principal agora",
          type: "radio",
          required: true,
          options: [
            { value: "longo-prazo", label: "Construir uma posição de longo prazo" },
            { value: "diversificar", label: "Diversificar parte do patrimônio" },
            { value: "aprender", label: "Só aprender por enquanto" },
          ],
        },
      ],
    },
    {
      title: "Recursos e prontidão",
      description: "Uma conta nova só aparece como próximo passo quando existe base e intenção para avançar.",
      fields: [
        {
          id: "valorMensal",
          label: "Valor mensal que você considera como referência",
          type: "range",
          min: 50,
          max: 2000,
          step: 50,
          value: 200,
          format: (value) => `R$ ${value}`,
        },
        {
          id: "reserva",
          label: "Você já possui uma reserva para imprevistos compatível com seus gastos?",
          type: "radio",
          required: true,
          options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Ainda não" },
          ],
        },
        {
          id: "prontidao",
          label: "Você se sente pronto para abrir e proteger uma conta agora?",
          type: "radio",
          required: true,
          options: [
            { value: "sim", label: "Sim, depois de revisar os passos" },
            { value: "nao", label: "Não, quero entender melhor primeiro" },
          ],
        },
      ],
    },
    {
      title: "Risco e comportamento",
      description: "A melhor primeira ação depende também do que pode levar a uma decisão impulsiva.",
      fields: [
        {
          id: "medo",
          label: "O que mais dificulta seu primeiro passo?",
          type: "radio",
          required: true,
          options: [
            { value: "perder", label: "Medo de perder dinheiro" },
            { value: "golpes", label: "Medo de cair em golpe" },
            { value: "complexidade", label: "Parece complicado demais" },
            { value: "nenhum", label: "Quero apenas organizar o processo" },
          ],
        },
        {
          id: "reacaoQueda",
          label: "Se um ativo cair bastante depois da compra, qual reação parece mais provável?",
          type: "radio",
          required: true,
          options: [
            { value: "vende", label: "Querer vender para interromper o desconforto" },
            { value: "espera", label: "Revisar a tese antes de agir" },
            { value: "compra", label: "Querer comprar mais imediatamente" },
          ],
        },
      ],
    },
  ],

  buildReport(answers) {
    const plan = [];
    const findings = [];
    const eligible =
      answers.jaTemBinance === "nao" &&
      answers.reserva === "sim" &&
      answers.prontidao === "sim" &&
      answers.objetivo !== "aprender";

    if (answers.reserva === "nao") {
      findings.push({
        severity: 3,
        title: "A reserva vem antes do primeiro aporte",
        text: "Sem uma reserva compatível com seus gastos, um imprevisto pode obrigar a venda de um ativo volátil em um momento ruim. O plano prioriza essa base antes de qualquer cadastro ou compra.",
      });
      plan.push({
        title: "Construir a reserva para imprevistos",
        text: "Defina um valor e um local de fácil acesso de acordo com seus gastos, renda e estabilidade. A referência mensal de cripto pode esperar até essa base existir.",
      });
    }

    plan.push({
      title: `Tratar R$ ${answers.valorMensal} como referência, não obrigação`,
      text: "O valor informado ajuda a dimensionar o processo. Ele pode ser reduzido ou adiado se competir com despesas essenciais, dívidas ou reserva.",
    });

    if (answers.experiencia === "nunca") {
      plan.push({
        title: "Aprender o fluxo antes de aumentar valores",
        text: "Revise cadastro, autenticação, depósito, compra e saque usando documentação oficial. Começar pequeno serve para entender a mecânica, não para buscar retorno rápido.",
      });
    } else if (answers.experiencia === "conta-outra") {
      plan.push({
        title: "Comparar antes de abrir ou mover recursos",
        text: "Considere segurança, produtos necessários, custos e disponibilidade no seu país. Uma promoção isolada não precisa justificar outra conta.",
      });
    } else {
      plan.push({
        title: "Definir o papel de cripto no patrimônio",
        text: "Compare volatilidade, liquidez e concentração com os ativos que você já possui antes de decidir qualquer alocação.",
      });
    }

    if (answers.objetivo === "aprender") {
      findings.push({
        severity: 1,
        title: "Aprender sem abrir conta é uma decisão válida",
        text: "Você não precisa transformar curiosidade em cadastro. O plano termina com estudo e critérios para uma decisão futura.",
      });
      plan.push({
        title: "Criar uma lista de dúvidas verificáveis",
        text: "Anote o que precisa entender sobre custódia, taxas, risco de plataforma e tributação. Use fontes oficiais e volte à decisão apenas quando as dúvidas essenciais estiverem resolvidas.",
      });
    } else if (answers.objetivo === "diversificar") {
      plan.push({
        title: "Evitar que diversificação vire concentração",
        text: "Defina previamente qual função cripto teria no patrimônio e quais riscos você não quer ampliar. Diversificar não exige comprar imediatamente.",
      });
    } else {
      plan.push({
        title: "Escrever horizonte e critérios de revisão",
        text: "Registre por que pretende manter a posição, quando revisará a decisão e quais mudanças fariam o plano deixar de fazer sentido.",
      });
    }

    if (answers.medo === "golpes") {
      plan.push({
        title: "Preparar a segurança contra engenharia social",
        text: "Acesse a plataforma por endereço ou aplicativo oficial, ative 2FA e código antiphishing quando disponível e desconfie de suporte iniciado por mensagem privada.",
      });
    } else if (answers.medo === "perder") {
      plan.push({
        title: "Definir um limite de exposição tolerável",
        text: "Use somente um valor cuja oscilação não comprometa despesas nem tranquilidade. Stablecoins podem reduzir a oscilação de preço em relação a outros criptoativos, mas também têm riscos de emissor, paridade e plataforma.",
      });
    } else if (answers.medo === "complexidade") {
      plan.push({
        title: "Aprender um conceito por vez",
        text: "Separe cadastro, segurança, depósito, compra e saque em etapas. Não avance para produtos que você ainda não consegue explicar em linguagem simples.",
      });
    } else {
      plan.push({
        title: "Registrar os riscos antes da primeira compra",
        text: "Liste volatilidade, custódia, golpes, taxas e tributação. Um processo organizado reduz a chance de ignorar riscos por excesso de confiança.",
      });
    }

    if (answers.reacaoQueda === "vende") {
      findings.push({
        severity: 2,
        title: "Quedas podem provocar decisão para aliviar desconforto",
        text: "Uma pausa deliberada e a revisão da tese ajudam a separar risco real de vontade de interromper a ansiedade.",
      });
      plan.push({
        title: "Definir uma regra de pausa antes de vender",
        text: "Quando houver queda forte, registre o que mudou financeiramente e o que é apenas reação emocional. Decida depois de revisar essas duas partes.",
      });
    } else if (answers.reacaoQueda === "compra") {
      findings.push({
        severity: 1,
        title: "Comprar mais também pode ser reação impulsiva",
        text: "Preço menor não substitui análise de risco, limite de exposição e preservação da reserva.",
      });
      plan.push({
        title: "Criar critérios antes de aumentar a posição",
        text: "Defina previamente limite, fonte do dinheiro e motivo da compra. Não use reserva ou despesas essenciais para responder a uma queda.",
      });
    } else {
      plan.push({
        title: "Manter um calendário de revisão",
        text: "Revise a tese e os riscos em momentos definidos, em vez de transformar cada oscilação em uma nova decisão.",
      });
    }

    if (answers.prontidao === "nao") {
      findings.push({
        severity: 1,
        title: "Ainda não estar pronto remove a oferta",
        text: "O próximo passo é compreender cadastro, custódia e risco. Nenhuma conta nova é necessária para concluir este plano.",
      });
      plan.push({
        title: "Revisar o guia de criação e proteção de conta",
        text: "Use o conteúdo educacional para entender o processo. Volte à decisão de cadastro somente quando conseguir explicar os principais riscos e controles.",
      });
    } else if (answers.jaTemBinance === "sim") {
      plan.push({
        title: "Revisar a segurança da conta que já existe",
        text: "Confirme 2FA, dispositivos autorizados, código antiphishing e canais oficiais. Não é necessário abrir outra conta para concluir o plano.",
      });
    } else if (eligible) {
      plan.push({
        title: "Revisar as condições antes de criar a conta",
        text: "Confirme país, elegibilidade, KYC, produtos disponíveis e benefício exibido na página de cadastro. Abrir conta não obriga depósito ou operação.",
      });
      plan.push({
        title: "Ativar proteções antes de transferir recursos",
        text: "Conclua a verificação de identidade exigida, ative 2FA e revise os dispositivos e códigos de segurança antes do primeiro depósito.",
      });
      plan.push({
        title: "Testar o processo com valor pequeno",
        text: "Faça um primeiro depósito compatível com seu plano apenas para entender saldo, compra e saque. Aumentar valores depende de nova decisão consciente.",
      });
    }

    const convertOverride = eligible
      ? {
          offerKey: "default",
          tag: "Próximo passo compatível",
          headline: "Conta nova, se você decidir avançar",
          sub: "A oferta apareceu porque você informou que não possui Binance, já tem reserva, está pronto para revisar o cadastro e quer avançar além do estudo.",
          offers: [
            "Cadastre-se pelo link de indicação e receba cashback vitalício em parte das taxas elegíveis.",
            "Válido para contas novas e elegíveis.",
            "Abrir conta não obriga depósito ou operação.",
          ],
          ctaLabel: "Ver condições para conta nova →",
          note: "Confirme no cadastro o país, a elegibilidade, os produtos cobertos e as condições vigentes. O benefício pode não se aplicar a todas as operações.",
          disclosure: "Este é um link de afiliado. A DLT Academy pode receber comissão se uma conta elegível for criada e utilizada. A recomendação decorre das respostas acima, e as condições exibidas pela Binance prevalecem.",
        }
      : null;

    return {
      headline: eligible ? "Plano pronto para revisão" : "Plano educacional sem pressão",
      sublabel: `Para quem está ${EXPERIENCIA_LABEL[answers.experiencia]} e quer ${OBJETIVO_LABEL[answers.objetivo]}`,
      tone: answers.reserva === "nao" ? "bad" : "good",
      stats: [
        { value: `R$ ${answers.valorMensal}`, label: "referência mensal" },
        { value: answers.reserva === "sim" ? "Base pronta" : "Reserva primeiro", label: "situação financeira" },
        { value: eligible ? "Conta elegível" : "Sem oferta", label: "próximo passo" },
      ],
      findings,
      plan,
      convertOverride,
      extraText: "Este plano organiza uma decisão educacional. Ele não prevê preços, não define uma alocação ideal e não substitui avaliação financeira, tributária ou jurídica individual.",
      shareCard: {
        eyebrow: "MEU PLANO DE ENTRADA NO CRIPTO",
        headline: eligible ? "PRONTO PARA REVISAR" : "BASE PRIMEIRO",
        lines: [
          `${EXPERIENCIA_LABEL[answers.experiencia]} · ${OBJETIVO_LABEL[answers.objetivo]}`,
          "Educacional — não é promessa de retorno",
        ],
        headlineColor: eligible ? "#6EE7A8" : "#4A8DF8",
      },
    };
  },
};
