import plans from "./plans.js";

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

document.getElementById("current-year").textContent = new Date().getFullYear();

const swiper = new Swiper(".netflix-slider", {
  slidesPerView: "auto",
  spaceBetween: 16,
  loop: true,
  grabCursor: true,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 3000,

  breakpoints: {
    768: {
      spaceBetween: 24,
    },
    1024: {
      spaceBetween: 32,
    },
  },
});

const slider = document.querySelector(".swiper-wrapper");

slider.addEventListener("mouseenter", () => {
  swiper.autoplay.stop();
});

slider.addEventListener("mouseleave", () => {
  swiper.autoplay.start();
});

document.querySelectorAll(".card-back").forEach((back) => {
  back.classList.add("d-none");
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".card-back").forEach((back) => {
      back.classList.remove("d-none");
    });
  }, 100);
});

function setupCardEvents() {
  document.addEventListener("click", (event) => {
    const flipBtn = event.target.closest(".flip-btn");

    if (flipBtn) {
      flipBtn.closest(".cta-item")?.classList.toggle("flip");
    }
  });

  document.addEventListener(
    "mouseenter",
    (event) => {
      const wrapper = event.target.closest(".btn-effect-wrapper");
      wrapper?.classList.add("is-hover");
    },
    true,
  );

  document.addEventListener(
    "mouseleave",
    (event) => {
      const wrapper = event.target.closest(".btn-effect-wrapper");
      wrapper?.classList.remove("is-hover");
    },
    true,
  );
}
renderSemestralCards();
setupCardEvents();

function resetState() {
  state.concurso = null;
  state.mentoria = null;

  applyFade(helper, restartBtn, 350);
  applyFade(step1, step2, 600);
  applyFade(helper, helperResult, 350);
  applyFade(helper, cardsContainer, 350);
}

const state = {
  concurso: null,
  mentoria: null,
};

const helper = document.getElementById("quiz-helper");
const helperResult = document.getElementById("quiz-helper-result");
const restartBtn = document.getElementById("restart-quiz");

const step1 = document.getElementById("quiz-step-1");
const step2 = document.getElementById("quiz-step-2");

const cardsContainer = document.getElementById("content-cards-engrenando");

restartBtn.addEventListener("click", () => resetState());

document.querySelectorAll(".btn-concurso").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.concurso = btn.dataset.concurso;

    applyFade(restartBtn, helper, 350);

    const plansWithMentoria = ["eags"];

    if (plansWithMentoria.includes(state.concurso)) {
      applyFade(step2, step1, 600);
      return;
    }

    showRecommendation();
  });
});

document.querySelectorAll(".btn-mentoria").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mentoria = btn.dataset.mentoria;
    showRecommendation();
  });
});

function applyFade(elementFadeIn, elementFadeOut, time) {
  elementFadeOut?.classList.remove("effect-visible");

  elementFadeIn.style.transitionDuration = `${time / 1000}s`;

  setTimeout(() => {
    elementFadeOut?.classList.add("d-none");

    elementFadeIn.classList.remove("d-none");
    requestAnimationFrame(() => {
      elementFadeIn.classList.add("effect-visible");
    });
  }, time);
}

function showRecommendation() {
  if (!state.concurso) {
    return;
  }

  const recommendation = getRecommendation();
  if (!recommendation) return;

  applyFade(helperResult, step1, 350);
  renderCards(recommendation.primary, recommendation.secondary);
  applyFade(cardsContainer, step2, 350);
}

function getRecommendation() {
  if (state.concurso === "indeciso") {
    return {
      primary: plans.sefianas,
      secondary: null,
    };
  }

  if (state.concurso === "cap") {
    return {
      primary: plans.cap,
      secondary: plans.sefianas,
    };
  }

  if (state.concurso === "eags") {
    return {
      primary: state.mentoria === "sim" ? plans.eagsMentoria : plans.eags,
      secondary: plans.sefianas,
    };
  }

  if (state.concurso === "esa") {
    return {
      primary: state.mentoria === "sim" ? plans.esaMentoria : plans.esa,
      secondary: plans.sefianas,
    };
  }

  if (state.concurso === "ebserh") {
    return {
      primary: state.mentoria === "sim" ? plans.ebserhMentoria : plans.ebserh,
      secondary: plans.sefianas,
    };
  }
}

function renderCards(primary, secondary) {
  const container = document.getElementById("content-cards-engrenando");

  let html = createCard(primary, true);

  if (secondary) {
    html += createCard(secondary);
  }

  container.innerHTML = `
    <div class="cta-grid">
      ${html}
    </div>
  `;

  container.classList.remove("d-none");
}

function createCard(plan, featured = false) {
  return `
    <div class="cta-item">
      <div class="card-inner">
        <div class="card-front bg-section-1 ${featured ? "destaque" : ""}">
          <div class="selo">${plan.badge}</div>

          <h3>${plan.name}</h3>
          <p>${plan.description}</p>

          <ul class="container-price">
            <li class="price">R$ ${plan.price} <span>p/ ${plan.billing === "monthly" ? "mês" : plan.billing}</span></li>
          </ul>

          <div class="btn-cta-container">
            <a
              href="${plan.url}"
              class="btn-primary btn-effect-wrapper"
            >
              <span class="text-wrapper">
                <!-- placeholder invisível (define tamanho do botão) -->
                <span class="text placeholder"
                  >Aceito a recomendação</span
                >
                <!-- textos animados -->
                <span class="text default">Aceito a recomendação</span>
                <span class="text hover"
                  >Fazer <span class="highlight">matrícula</span></span
                >
              </span>
            </a>

            <button class="flip-btn">
              <span class="icon-wrapper">
                <i class="fa-solid fa-rotate"></i>
              </span>
              O que tem neste plano?
            </button>
          </div>
        </div>

        <div class="card-back bg-section-1 ${featured ? "destaque" : ""}">
          <h3>Neste plano você terá:</h3>
          <ul>
            ${plan.features.map((item) => `<li>✔ ${item}</li>`).join("")}
          </ul>

          <div class="btn-cta-container">
            <button class="flip-btn">
              <span class="icon-wrapper">
                <i class="fa-solid fa-rotate"></i>
              </span>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSemestralCards() {
  const container = document.getElementById("content-cards-semestrais");

  if (!container) return;

  const semesterPlans = [
    plans.sefianasSemestral,
    plans.enfermagemPortuguesSemestral,
    plans.eagsMentoriaSemestral,
  ];

  container.innerHTML = `
    <div class="cta-grid">
      ${semesterPlans
        .map((plan) =>
          createSemestralCard(plan, plan.id === "sefianasSemestral"),
        )
        .join("")}
    </div>
  `;
}

function createSemestralCard(plan, featured = false) {
  const hasPix = Boolean(plan.pixPrice);

  const priceHtml = hasPix
    ? `
      <div class="semestral-price">
        <span class="semestral-price-label">
          A partir de
        </span>

        <div class="semestral-installments">
          <span class="installments-count">
            ${plan.installments}x de
          </span>
          <strong>
            ${formatCurrency(plan.installmentPrice)}
          </strong>
        </div>

        <span class="semestral-no-interest">
          Sem juros
        </span>

        <span class="semestral-price-total">
          Total: ${formatCurrency(plan.total)}
        </span>
      </div>

      <div class="semestral-offer">
        <span class="offer-badge">
          ${plan.pixDiscount}% OFF
        </span>

        <span>
          Ou <strong>${formatCurrency(plan.pixPrice)}</strong>
          no Pix
        </span>
      </div>
    `
    : `
      <div class="semestral-price">
        <span class="semestral-price-label">
          Valor do semestre
        </span>

        <div class="semestral-full-price">
          ${formatCurrency(plan.total)}
        </div>

        <span class="semestral-price-total">
          6 meses de preparação
        </span>
      </div>

      <div class="semestral-offer">
        <span class="offer-badge">
          Economize ${formatCurrency(plan.savings)}
        </span>
        <span>Em relação ao plano mensal</span>
      </div>
    `;

  const enrollmentHtml = `
  <a
    href="${plan.url ?? "#planos-semestrais"}"
    class="btn-primary btn-semestral-enroll"
  >
    ${plan.url ? "Fazer matrícula" : "Matrículas em breve"}
  </a>
`;

  return `
    <div class="cta-item">
      <div class="card-inner">

        <div class="card-front bg-section-1 ${featured ? "destaque" : ""}">
          <div class="selo">${plan.badge}</div>

          <h3>${plan.name}</h3>
          <p>${plan.description}</p>

          ${priceHtml}

          <div class="btn-cta-container">
            ${enrollmentHtml}

            <button type="button" class="flip-btn">
              <span class="icon-wrapper">
                <i class="fa-solid fa-rotate"></i>
              </span>
              Ver detalhes da oferta
            </button>
          </div>
        </div>

        <div class="card-back bg-section-1 ${featured ? "destaque" : ""}">
          <h3>Por que escolher este plano?</h3>

          <ul>
            ${plan.features.map((feature) => `<li>✔ ${feature}</li>`).join("")}
          </ul>

          <div class="semestral-back-summary">
            <span>Investimento semestral</span>
            <strong>${formatCurrency(plan.total)}</strong>
            ${
              hasPix
                ? `<small>Ou ${formatCurrency(plan.pixPrice)} no Pix</small>`
                : `<small>Economize ${formatCurrency(plan.savings)}</small>`
            }
          </div>

          <div class="btn-cta-container">
            <button type="button" class="flip-btn">
              <span class="icon-wrapper">
                <i class="fa-solid fa-rotate"></i>
              </span>
              Voltar
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

document.querySelectorAll(".feedback-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("show-back");
  });
});

// MODAL

let currentSide = "front";
let currentFront = "";
let currentBack = "";

const modal = document.getElementById("feedback-modal");
const modalImage = document.getElementById("feedback-modal-image");
const feedbackPage = document.querySelector("#feedback-page");

let touchStartX = 0;
let touchEndX = 0;

modalImage.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modalImage.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const distance = touchEndX - touchStartX;
  // Ignora movimentos pequenos
  if (Math.abs(distance) < 50) return;

  if (distance < 0 && currentSide === "front") {
    modalImage.style.opacity = "0";
    modalImage.src = currentBack;
    currentSide = "back";
  } else if (distance > 0 && currentSide === "back") {
    modalImage.style.opacity = "0";
    modalImage.src = currentFront;
    currentSide = "front";
  }

  setTimeout(() => {
    modalImage.style.opacity = "1";
    updatePageIndicator();
  }, 150);
}

document.querySelectorAll(".feedback-selo-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    const card = e.target.parentElement.parentElement;

    currentFront = card.dataset.front;
    currentBack = card.dataset.back;

    currentSide = "front";
    updatePageIndicator();

    modalImage.src = currentFront;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

function updatePageIndicator() {
  feedbackPage.textContent = currentSide === "front" ? "1 / 2" : "2 / 2";
}

document.querySelector(".feedback-nav.next").addEventListener("click", () => {
  if (currentSide === "front") {
    modalImage.src = currentBack;
    currentSide = "back";
    updatePageIndicator();
  }
});

document.querySelector(".feedback-nav.prev").addEventListener("click", () => {
  if (currentSide === "back") {
    modalImage.src = currentFront;
    currentSide = "front";
    updatePageIndicator();
  }
});

// FAC

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const currentItem = question.parentElement;

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
      }
    });

    currentItem.classList.toggle("active");
  });
});
