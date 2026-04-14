import { CoffeeRecipe } from "../models/CoffeeRecipe.js";
import { ALL_RECIPES } from "../data/recipes.js";

const COCKTAIL_API = "https://www.thecocktaildb.com/api/json/v1/1";
const PAGE_SIZE = 6;

function extractIngredients(drink) {
  const list = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ing && ing.trim())
      list.push(measure ? `${measure.trim()} ${ing.trim()}` : ing.trim());
  }
  return list;
}

function parseSteps(instructions) {
  if (!instructions) return [];
  return instructions
    .split(/(?:\r?\n|(?<=\.)\s+(?=[A-ZА-Я]))/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
}

const ICONS = ["☕", "☕", "☕", "☕", "☕", "☕", "🧋", "🧊", "🧋", "🧊"];

const categories = [
  { id: "all", label: "Все" },
  { id: "espresso", label: "Эспрессо" },
  { id: "milk", label: "С молоком" },
  { id: "cold", label: "Холодные" },
];

let activeCategory = "all";
let searchQuery = "";
let recipes = [];
let expanded = false;

const renderGrid = () => {
  const filtered = recipes.filter(
    (r) => r.matchesCategory(activeCategory) && r.matchesQuery(searchQuery),
  );
  if (filtered.length === 0)
    return `<p class="catalog__empty">Рецепты не найдены</p>`;

  const visible = expanded ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE;

  return (
    visible.map((r) => r.renderCatalogCard()).join("") +
    (hasMore
      ? `
        <button class="catalog__show-more" id="catalog-show-more">
            ${expanded ? "Свернуть" : `Показать ещё ${filtered.length - PAGE_SIZE}`}
            <span class="catalog__show-more-arrow${expanded ? " catalog__show-more-arrow--up" : ""}">▼</span>
        </button>`
      : "")
  );
};

const CatalogPage = () => `
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Главная</button>
        <button class="tab-nav__tab" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--catalog">
        <div class="catalog">
            <input type="text" class="catalog__search" id="catalog-search"
                   placeholder="Поиск рецептов..." value="${searchQuery}">
            <div class="catalog__filters" id="catalog-filters">
                ${categories
                  .map(
                    (c) => `
                    <button class="catalog__filter${c.id === activeCategory ? " catalog__filter--active" : ""}"
                            data-category="${c.id}">${c.label}</button>
                `,
                  )
                  .join("")}
            </div>
            <div class="catalog__grid" id="catalog-grid">
                ${ALL_RECIPES.slice(0, PAGE_SIZE)
                  .map((r) => r.renderCatalogCard())
                  .join("")}
                <button class="catalog__show-more" id="catalog-show-more">
                    Показать ещё ${ALL_RECIPES.length - PAGE_SIZE}
                    <span class="catalog__show-more-arrow">▼</span>
                </button>
            </div>
        </div>
    </div>
`;

async function loadRecipes() {
  recipes = ALL_RECIPES;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const listRes = await fetch(
      `${COCKTAIL_API}/filter.php?c=${encodeURIComponent("Coffee / Tea")}`,
      { signal: controller.signal },
    );
    clearTimeout(timeout);
    const listData = await listRes.json();
    const drinks = (listData.drinks || []).slice(0, 6);
    if (!drinks.length) return;
    const details = await Promise.all(
      drinks.map((d) =>
        fetch(`${COCKTAIL_API}/lookup.php?i=${d.idDrink}`)
          .then((r) => r.json())
          .then((j) => j.drinks?.[0])
          .catch(() => null),
      ),
    );
    const apiRecipes = details.filter(Boolean).map((drink, i) =>
      CoffeeRecipe.fromJSON({
        id: `api-${drink.idDrink}`,
        name: drink.strDrink,
        desc: (drink.strInstructions ?? "").slice(0, 65).trim() + "…",
        time: "5 мин",
        icon: ICONS[i % ICONS.length],
        category: "espresso",
        ingredients: extractIngredients(drink),
        steps: parseSteps(drink.strInstructions),
        fullDesc: drink.strInstructions ?? "",
        image: drink.strDrinkThumb ?? null,
      }),
    );
    if (apiRecipes.length) {
      recipes = [...ALL_RECIPES, ...apiRecipes];
      const gridEl = document.getElementById("catalog-grid");
      if (gridEl) gridEl.innerHTML = renderGrid();
    }
  } catch {
    /* оставляем ALL_RECIPES */
  }
}

function openModal(id) {
  const recipe = recipes.find((r) => r.id == id);
  if (!recipe) return;
  document.body.insertAdjacentHTML("beforeend", recipe.renderModal());
  const backdrop = document.getElementById("recipe-modal");
  document
    .getElementById("recipe-modal-close")
    .addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
}

function closeModal() {
  document.getElementById("recipe-modal")?.remove();
}

export const mount = async () => {
  const searchInput = document.getElementById("catalog-search");
  const filtersEl = document.getElementById("catalog-filters");
  const gridEl = document.getElementById("catalog-grid");
  if (!searchInput || !filtersEl || !gridEl) return;

  recipes = ALL_RECIPES;
  loadRecipes();

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    expanded = false;
    gridEl.innerHTML = renderGrid();
  });

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    expanded = false;
    filtersEl
      .querySelectorAll(".catalog__filter")
      .forEach((b) =>
        b.classList.toggle(
          "catalog__filter--active",
          b.dataset.category === activeCategory,
        ),
      );
    gridEl.innerHTML = renderGrid();
  });

  gridEl.addEventListener("click", (e) => {
    if (e.target.closest("#catalog-show-more")) {
      expanded = !expanded;
      gridEl.innerHTML = renderGrid();
      return;
    }
    const card = e.target.closest("[data-id]");
    if (card) openModal(card.dataset.id);
  });
};

export default CatalogPage;
