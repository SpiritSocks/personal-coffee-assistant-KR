import { CoffeeRecipe } from '../models/CoffeeRecipe.js';

// Mock data — to be replaced with free API later
const recipes = CoffeeRecipe.listFromJSON([
    { id: 1, name: 'Flat White',  desc: 'Velvety double ristretto',   time: '5 min', icon: '☕', category: 'milk' },
    { id: 2, name: 'Iced Latte',  desc: 'Espresso over ice',          time: '3 min', icon: '🧋', category: 'cold' },
    { id: 3, name: 'Pour Over',   desc: 'Clean bright cup',           time: '8 min', icon: '🫖', category: 'espresso' },
    { id: 4, name: 'Cortado',     desc: 'Equal parts espresso+milk',  time: '4 min', icon: '🍵', category: 'milk' },
    { id: 5, name: 'Americano',   desc: 'Strong espresso with water', time: '2 min', icon: '☕', category: 'espresso' },
    { id: 6, name: 'Cappuccino',  desc: 'Espresso with foamed milk',  time: '5 min', icon: '☕', category: 'milk' },
    { id: 7, name: 'Cold Brew',   desc: 'Slow steeped, smooth',       time: '12h',   icon: '🧊', category: 'cold' },
    { id: 8, name: 'Espresso',    desc: 'Pure concentrated shot',     time: '1 min', icon: '☕', category: 'espresso' },
]);

const categories = [
    { id: 'all',      label: 'All' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'milk',     label: 'Milk-based' },
    { id: 'cold',     label: 'Cold' },
];

// State kept in module scope so it survives across mount() calls on the same page
let activeCategory = 'all';
let searchQuery = '';

const renderGrid = () => {
    const filtered = recipes.filter(r =>
        r.matchesCategory(activeCategory) && r.matchesQuery(searchQuery)
    );

    if (filtered.length === 0) {
        return `<p class="catalog__empty">No recipes found</p>`;
    }
    return filtered.map(r => r.renderCatalogCard()).join('');
};

const CatalogPage = () => `
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Home</button>
        <button class="tab-nav__tab" data-link="/chat">AI Chat</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/catalog">Catalog</button>
        <button class="tab-nav__tab" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen screen--catalog">
        <div class="catalog">
            <input
                type="text"
                class="catalog__search"
                id="catalog-search"
                placeholder="Search recipes..."
                value="${searchQuery}"
            >

            <div class="catalog__filters" id="catalog-filters">
                ${categories.map(c => `
                    <button
                        class="catalog__filter${c.id === activeCategory ? ' catalog__filter--active' : ''}"
                        data-category="${c.id}"
                    >${c.label}</button>
                `).join('')}
            </div>

            <div class="catalog__grid" id="catalog-grid">
                ${renderGrid()}
            </div>
        </div>
    </div>
`;

export const mount = () => {
    const searchInput = document.getElementById('catalog-search');
    const filtersEl = document.getElementById('catalog-filters');
    const gridEl = document.getElementById('catalog-grid');

    if (!searchInput || !filtersEl || !gridEl) return;

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        gridEl.innerHTML = renderGrid();
    });

    filtersEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-category]');
        if (!btn) return;
        activeCategory = btn.dataset.category;
        filtersEl.querySelectorAll('.catalog__filter').forEach(b => {
            b.classList.toggle('catalog__filter--active', b.dataset.category === activeCategory);
        });
        gridEl.innerHTML = renderGrid();
    });
};

export default CatalogPage;
