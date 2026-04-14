import { render } from "./router.js";

const NAME_KEY = "coffee-user-name";

function showNamePopup() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "name-popup__overlay";
    overlay.innerHTML = `
            <div class="name-popup">
                <div class="name-popup__icon">☕</div>
                <h2 class="name-popup__title">Добро пожаловать!</h2>
                <p class="name-popup__sub">Как вас называть?</p>
                <input class="name-popup__input" id="name-input" type="text"
                       placeholder="Введите имя..." maxlength="30" autocomplete="off">
                <button class="name-popup__btn" id="name-confirm">Начать</button>
            </div>
        `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector("#name-input");
    const btn = overlay.querySelector("#name-confirm");
    input.focus();

    function confirm() {
      const name = input.value.trim();
      if (!name) {
        input.focus();
        return;
      }
      localStorage.setItem(NAME_KEY, name);
      overlay.classList.add("name-popup__overlay--out");
      overlay.addEventListener(
        "animationend",
        () => {
          overlay.remove();
          resolve();
        },
        { once: true },
      );
    }

    btn.addEventListener("click", confirm);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirm();
    });
  });
}

async function init() {
  if (!localStorage.getItem(NAME_KEY)) {
    await showNamePopup();
  }
  render();
}

init();
