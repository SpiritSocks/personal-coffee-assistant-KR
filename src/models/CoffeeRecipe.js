/**
 * CoffeeRecipe — доменная модель рецепта кофе.
 * Инкапсулирует данные рецепта, фильтрацию и рендер карточки.
 */
export class CoffeeRecipe {
    constructor({ id, name, desc, time, icon, category }) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.time = time;
        this.icon = icon;
        this.category = category;
    }

    /** Подходит ли рецепт под выбранную категорию ('all' пропускает всё). */
    matchesCategory(category) {
        return category === 'all' || this.category === category;
    }

    /** Совпадает ли запрос с названием или описанием (регистронезависимо). */
    matchesQuery(query) {
        const q = (query || '').trim().toLowerCase();
        if (!q) return true;
        return (
            this.name.toLowerCase().includes(q) ||
            this.desc.toLowerCase().includes(q)
        );
    }

    /** HTML-карточка для каталога (БЭМ). */
    renderCatalogCard() {
        return `
            <article class="catalog-card" data-id="${this.id}">
                <div class="catalog-card__icon">${this.icon}</div>
                <div class="catalog-card__info">
                    <h3 class="catalog-card__title">${this.name}</h3>
                    <p class="catalog-card__desc">${this.desc}</p>
                    <span class="badge">${this.time}</span>
                </div>
            </article>
        `;
    }

    /** HTML-карточка для «Рекомендовано» на главной (БЭМ). */
    renderRecCard(badge = this.time) {
        return `
            <article class="rec-card" data-id="${this.id}">
                <span class="rec-card__emoji">${this.icon}</span>
                <h3 class="rec-card__title">${this.name}</h3>
                <p class="rec-card__desc">${this.desc}</p>
                <span class="badge">${badge}</span>
            </article>
        `;
    }

    /** Создать экземпляр из plain-объекта (например, из API JSON). */
    static fromJSON(json) {
        return new CoffeeRecipe(json);
    }

    /** Массово создать экземпляры из массива. */
    static listFromJSON(arr) {
        return arr.map(CoffeeRecipe.fromJSON);
    }
}
