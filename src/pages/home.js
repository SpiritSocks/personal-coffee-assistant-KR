import { getRecommended } from "../data/recipes.js";

const STORAGE_KEY = "coffee-prefs";
const NAME_KEY = "coffee-user-name";

const defaultPrefs = { strength: 3, milk: true, sugar: false };

const loadPrefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : { ...defaultPrefs };
  } catch {
    return { ...defaultPrefs };
  }
};

const HomePage = () => {
  const prefs = loadPrefs();
  const recommended = getRecommended(prefs);
  const name = localStorage.getItem(NAME_KEY) || "друг";

  return `
    <nav class="tab-nav">
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/">Главная</button>
        <button class="tab-nav__tab" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--home">
        <div class="hero">
            <div class="hero__text">
                <h1 class="hero__greeting">Доброе утро,<br>${name} ☕</h1>
                <p class="hero__sub">По вашему вкусовому профилю — вот что рекомендуем сегодня</p>
            </div>
            <div class="hero__icon">☕</div>
        </div>

        <section class="section">
            <h2 class="section__label">РЕКОМЕНДУЕМ ВАМ</h2>
            <div class="rec-list">
                ${recommended.map((r) => r.renderRecCard()).join("")}
            </div>
        </section>

        <section class="section">
            <h2 class="section__label">БЫСТРЫЙ ДОСТУП</h2>
            <div class="quick-access">
                <div class="quick-access__item" data-link="/catalog">
                    <span class="quick-access__icon">📖</span>
                    <div>
                        <div class="quick-access__title">Все рецепты</div>
                        <div class="quick-access__sub">Каталог напитков</div>
                    </div>
                </div>
                <div class="quick-access__item" data-link="/preferences">
                    <span class="quick-access__icon">⚙️</span>
                    <div>
                        <div class="quick-access__title">Мои настройки</div>
                        <div class="quick-access__sub">Изменить профиль</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `;
};

export default HomePage;
