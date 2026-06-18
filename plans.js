const plans = {
  megaCombo: {
    id: "megaCombo",
    name: "Mega Combo",
    description:
      "A preparação mais completa para concursos de enfermagem, incluindo EAGS-SEF e CAP-ENF.",
    price: "390",
    billing: "monthly",
    badge: "Mais Completo",
    features: [
      "Enfermagem",
      "Português",
      "Redação",
      "Mentoria",
      "3 correções de redação por mês",
    ],
    url: "https://pay.plataformatutory.com.br/checkout/a71d6ea3-265e-4691-b63a-73746cbd7d5f",
  },

  eagsMentoria: {
    id: "eagsMentoria",
    name: "EAGS-SEF Mentoria",
    description: "A preparação perfeita para quem foca no EAGS-SEF.",
    price: "320",
    billing: "monthly",
    badge: "Recomendado",
    features: ["Enfermagem", "Português", "Mentoria"],
    url: "https://pay.plataformatutory.com.br/checkout/2e09f7f4-5c62-48c5-8dc2-c2320f3e3082",
  },

  eags: {
    id: "eags",
    name: "EAGS-SEF",
    description:
      "A preparação melhor custo-benefício para quem foca no EAGS-SEF.",
    price: "250",
    billing: "monthly",
    badge: "Recomendado",
    features: ["Enfermagem", "Português"],
    url: "https://pay.plataformatutory.com.br/checkout/90ae98e6-1e52-4ea7-8738-adb2c40298e3",
  },

  cap: {
    id: "cap",
    name: "CAP-ENF",
    description: "A preparação perfeita para quem foca no CAP-ENF.",
    price: "230",
    billing: "monthly",
    badge: "Recomendado",
    features: ["Enfermagem", "Redação", "3 correções de redação por mês"],
    url: "https://pay.plataformatutory.com.br/checkout/08395dc1-8b37-4c49-830e-7f2b7082d784",
  },
};

export default plans;
