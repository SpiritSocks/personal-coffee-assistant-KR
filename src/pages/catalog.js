// Mock data — to be replaced with free API later
const mockRecipes = [
    { id: 1, name: 'Flat White',   desc: 'Velvety double ristretto',   time: '5 min', icon: '☕', category: 'milk' },
    { id: 2, name: 'Iced Latte',   desc: 'Espresso over ice',          time: '3 min', icon: '🧋', category: 'cold' },
    { id: 3, name: 'Pour Over',    desc: 'Clean bright cup',           time: '8 min', icon: '🫖', category: 'espresso' },
    { id: 4, name: 'Cortado',      desc: 'Equal parts espresso+milk',  time: '4 min', icon: '🍵', category: 'milk' },
    { id: 5, name: 'Americano',    desc: 'Strong espresso with water', time: '2 min', icon: '☕', category: 'espresso' },
    { id: 6, name: 'Cappuccino',   desc: 'Espresso with foamed milk',  time: '5 min', icon: '☕', category: 'milk' },
    { id: 7, name: 'Cold Brew',    desc: 'Slow steeped, smooth',       time: '12h',   icon: '🧊', category: 'cold' },
    { id: 8, name: 'Espresso',     desc: 'Pure concentrated shot',     time: '1 min', icon: '☕', category: 'espresso' },
];

const categories = [
    { id: 'all',      label: 'All' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'milk',     label: 'Milk-based' },
    { id: 'cold',     label: 'Cold' },
];

// State kept in module scope so it survives across mount() calls on the same page
let activeCategory = 'all';
let searchQuery = '';

const renderCard = (r) => `
    <div class="catalog-card">
        <div class="catalog-icon">${r.icon}</div>
        <div class="catalog-info">
            <h3 class="catalog-title">${r.name}</h3>
            <p class="catalog-desc">${r.desc}</p>
            <span class="badge">${r.time}</span>
        </div>
    </div>
`;

const renderGrid = () => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = mockRecipes.filter(r => {
        const catOk = activeCategory === 'all' || r.category === activeCategory;
        const searchOk = !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
        return catOk && searchOk;
    });

    if (filtered.length === 0) {
        return `<p class="catalog-empty">No recipes found</p>`;
    }
    return filtered.map(renderCard).join('');
};

const CatalogPage = () => {
    return `
    <nav class="tab-nav">
        <button class="tab" data-link="/">Home</button>
        <button class="tab" data-link="/chat">AI Chat</button>
        <button class="tab active" data-link="/catalog">Catalog</button>
        <button class="tab" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen catalog-screen">
        <input
            type="text"
            class="catalog-search"
            id="catalog-search"
            placeholder="Search recipes..."
            value="${searchQuery}"
        >

        <div class="catalog-filters" id="catalog-filters">
            ${categories.map(c => `
                <button
                    class="catalog-filter ${c.id === activeCategory ? 'active' : ''}"
                    data-category="${c.id}"
                >${c.label}</button>
            `).join('')}
        </div>

        <div class="catalog-grid" id="catalog-grid">
            ${renderGrid()}
        </div>
    </div>
    `;
};

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
        filtersEl.querySelectorAll('.catalog-filter').forEach(b => {
            b.classList.toggle('active', b.dataset.category === activeCategory);
        });
        gridEl.innerHTML = renderGrid();
    });
};

export default CatalogPage;
