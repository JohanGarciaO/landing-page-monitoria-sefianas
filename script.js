import plans from "./plans.js";

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
  document.querySelectorAll(".flip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".cta-item").classList.toggle("flip");
    });
  });

  const wrapperBtns = document.querySelectorAll(".btn-effect-wrapper");

  wrapperBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("is-hover");
    });

    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("is-hover");
    });
  });
}
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

    if (state.concurso === "eags") {
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
      primary: plans.megaCombo,
      secondary: null,
    };
  }

  if (state.concurso === "cap") {
    return {
      primary: plans.cap,
      secondary: plans.megaCombo,
    };
  }

  if (state.concurso === "eags" && state.mentoria === "sim") {
    return {
      primary: plans.eagsMentoria,
      secondary: plans.megaCombo,
    };
  }

  if (state.concurso === "eags" && state.mentoria === "nao") {
    return {
      primary: plans.eags,
      secondary: plans.megaCombo,
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

  setupCardEvents();

  container.classList.remove("d-none");
}

function createCard(plan, featured = false) {
  return `
    <div class="cta-item">
      <div class="card-inner">
        <div class="card-front bg-section-1 ${featured ? "destaque" : ""}">
          <div class="selo">${featured ? "🏆 Recomendado para você" : "⭐ Opção mais completa"}</div>

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
