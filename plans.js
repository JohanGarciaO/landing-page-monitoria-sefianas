const plans = {
  megaCombo: {
    id: "megaCombo",
    name: "Mega Combo",
    description: "A preparação mais completa para concursos de enfermagem.",
    price: "390",
    billing: "monthly",
    badge: "⭐ Opção mais completa",
    features: [
      "Enfermagem",
      "Português",
      "Redação",
      "Mentoria",
      "3 correções de redação por mês",
    ],
    url: "https://pay.plataformatutory.com.br/checkout/a71d6ea3-265e-4691-b63a-73746cbd7d5f",
  },

  sefianas: {
    id: "sefianas",
    name: "Enfermagem para Concursos",
    description: "A preparação completa para quem quer dominar enfermagem.",
    price: "150",
    billing: "monthly",
    badge: "⭐ Maior custo benefício",
    features: ["Enfermagem"],
    url: "https://invoice.infinitepay.io/plans/larissa-marcelo-/3VQYQleDkr",
  },

  eagsMentoria: {
    id: "eagsMentoria",
    name: "EAGS-SEF Mentoria",
    description: "A preparação perfeita para quem foca no EAGS-SEF.",
    price: "320",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Português", "Mentoria"],
    url: "https://pay.plataformatutory.com.br/checkout/2e09f7f4-5c62-48c5-8dc2-c2320f3e3082",
  },

  eags: {
    id: "eags",
    name: "EAGS-SEF",
    description:
      "A preparação melhor custo-benefício para quem foca no EAGS-SEF.",
    price: "260",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Português"],
    url: "https://pay.plataformatutory.com.br/checkout/90ae98e6-1e52-4ea7-8738-adb2c40298e3",
  },

  cap: {
    id: "cap",
    name: "CAP-ENF",
    description: "A preparação perfeita para quem foca no CAP-ENF.",
    price: "260",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Redação", "3 correções de redação por mês"],
    url: "https://pay.plataformatutory.com.br/checkout/08395dc1-8b37-4c49-830e-7f2b7082d784",
  },

  esaMentoria: {
    id: "esaMentoria",
    name: "ESA ENFERMAGEM Mentoria",
    description: "A preparação perfeita para quem foca na ESA saúde.",
    price: "320",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Português", "Mentoria"],
    url: "https://pay.plataformatutory.com.br/checkout/2e09f7f4-5c62-48c5-8dc2-c2320f3e3082",
  },

  esa: {
    id: "esa",
    name: "ESA ENFERMAGEM",
    description:
      "A preparação melhor custo-benefício para quem foca na ESA saúde.",
    price: "260",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Português"],
    url: "https://pay.plataformatutory.com.br/checkout/90ae98e6-1e52-4ea7-8738-adb2c40298e3",
  },

  ebserhMentoria: {
    id: "ebserhMentoria",
    name: "EBSERH Mentoria",
    description: "A preparação perfeita para quem foca na EBSERH.",
    price: "320",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Português", "Mentoria"],
    url: "https://pay.plataformatutory.com.br/checkout/2e09f7f4-5c62-48c5-8dc2-c2320f3e3082",
  },

  ebserh: {
    id: "ebserh",
    name: "EBSERH",
    description:
      "A preparação melhor custo-benefício para quem foca na EBSERH.",
    price: "260",
    billing: "monthly",
    badge: "🏆 Recomendado para você",
    features: ["Enfermagem", "Português"],
    url: "https://pay.plataformatutory.com.br/checkout/90ae98e6-1e52-4ea7-8738-adb2c40298e3",
  },

  // PLANOS SEMESTRAIS

  sefianasSemestral: {
    id: "sefianasSemestral",
    name: "Enfermagem para Concursos",
    description:
      "Garanta 6 meses de preparação em Enfermagem com uma condição especial.",
    badge: "⭐ Condição especial no Pix",
    installments: 6,
    installmentPrice: 127.32,
    total: 763.92,
    pixDiscount: 9.67,
    pixPrice: 690.05,
    savings: 136.08,
    features: [
      "Preparação completa em Enfermagem por 6 meses",
      "Parcelamento em 6x sem juros",
      "9,67% de desconto para pagamento no Pix",
    ],
    url: "https://checkout.infinitepay.io/larissa-marcelo-/xCoBcmGMS8",
  },

  enfermagemPortuguesSemestral: {
    id: "enfermagemPortuguesSemestral",
    name: "Enfermagem + Português",
    description:
      "Duas disciplinas essenciais para ampliar sua preparação para concursos.",
    badge: "💰 Economize R$ 500",
    total: 1060,
    savings: 500,
    features: [
      "Enfermagem e Português durante 6 meses",
      "Preparação para diferentes concursos",
      "Economia de R$ 500 em relação ao mensal",
    ],
    url: "https://pay.plataformatutory.com.br/checkout/8b69343b-6773-4bb0-9ada-5c7954cb93f7",
  },

  eagsMentoriaSemestral: {
    id: "eagsMentoriaSemestral",
    name: "EAGS-SEF com Mentoria",
    description: "Sua preparação para o EAGS com acompanhamento personalizado.",
    badge: "🏆 Economize R$ 670",
    total: 1250,
    savings: 670,
    features: [
      "Enfermagem, Português e Mentoria por 6 meses",
      "Acompanhamento personalizado dos estudos",
      "Economia de R$ 670 em relação ao mensal",
    ],
    url: "https://pay.plataformatutory.com.br/checkout/c7fc7140-8a9c-4174-8535-12cf1b3fb4bd",
  },
};

export default plans;
