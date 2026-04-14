const STORAGE_KEY = "coffee-prefs";

const defaultPrefs = {
  strength: 3, // 1..5
  milk: true,
  sugar: false,
};

const loadPrefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : { ...defaultPrefs };
  } catch {
    return { ...defaultPrefs };
  }
};

const savePrefs = (prefs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

let prefs = loadPrefs();

const НастройкиPage = () => {
  prefs = loadPrefs();
  return `
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Главная</button>
        <button class="tab-nav__tab" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--preferences">
        <div class="prefs">
            <div class="prefs__card">
                <h2 class="prefs__title">Крепость кофе</h2>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value="${prefs.strength}"
                    class="prefs__slider"
                    id="pref-strength"
                >
                <div class="prefs__slider-labels">
                    <span>Мягкий</span>
                    <span>Крепкий</span>
                </div>
            </div>

            <div class="prefs__card">
                <h2 class="prefs__title">Добавки</h2>
                <div class="prefs__row">
                    <span class="prefs__label">С молоком</span>
                    <label class="toggle">
                        <input type="checkbox" class="toggle__input" id="pref-milk" ${prefs.milk ? "checked" : ""}>
                        <span class="toggle__track"><span class="toggle__thumb"></span></span>
                    </label>
                </div>
                <div class="prefs__divider"></div>
                <div class="prefs__row">
                    <span class="prefs__label">С сахаром</span>
                    <label class="toggle">
                        <input type="checkbox" class="toggle__input" id="pref-sugar" ${prefs.sugar ? "checked" : ""}>
                        <span class="toggle__track"><span class="toggle__thumb"></span></span>
                    </label>
                </div>
            </div>

            <button class="prefs__save" id="pref-save">Сохранить настройки</button>
        </div>
    </div>
    `;
};

export const mount = () => {
  const strengthEl = document.getElementById("pref-strength");
  const milkEl = document.getElementById("pref-milk");
  const sugarEl = document.getElementById("pref-sugar");
  const saveBtn = document.getElementById("pref-save");

  if (!strengthEl || !milkEl || !sugarEl || !saveBtn) return;

  strengthEl.addEventListener("input", (e) => {
    prefs.strength = Number(e.target.value);
  });
  milkEl.addEventListener("change", (e) => {
    prefs.milk = e.target.checked;
  });
  sugarEl.addEventListener("change", (e) => {
    prefs.sugar = e.target.checked;
  });

  saveBtn.addEventListener("click", () => {
    savePrefs(prefs);
    const original = saveBtn.textContent;
    saveBtn.textContent = "Сохранено ✓";
    saveBtn.classList.add("prefs__save--saved");
    setTimeout(() => {
      saveBtn.textContent = original;
      saveBtn.classList.remove("prefs__save--saved");
    }, 1500);
  });
};

export default НастройкиPage;
