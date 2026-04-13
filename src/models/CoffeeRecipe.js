/**
 * CoffeeRecipe — доменная модель рецепта кофе.
 * Инкапсулирует данные рецепта, фильтрацию и рендер карточки.
 */
export class CoffeeRecipe {
    constructor({ id, name, desc, time, icon, category, steps = [], ingredients = [], fullDesc = '', image = null }) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.time = time;
        this.icon = icon;
        this.category = category;
        this.steps = steps;
        this.ingredients = ingredients;
        this.fullDesc = fullDesc;
        this.image = image;
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

    /** HTML модального окна с полным рецептом. */
    renderModal() {
        const ingredientsList = this.ingredients.map(i =>
            `<li class="recipe-modal__ingredient">${i}</li>`
        ).join('');

        const stepsList = this.steps.map((s, idx) =>
            `<li class="recipe-modal__step"><span class="recipe-modal__step-num">${idx + 1}</span>${s}</li>`
        ).join('');

        const imageHtml = this.image
            ? `<img class="recipe-modal__img" src="${this.image}" alt="${this.name}">`
            : '';

        const descText = this.fullDesc || this.desc;

        return `
            <div class="recipe-modal__backdrop" id="recipe-modal">
                <div class="recipe-modal">
                    <button class="recipe-modal__close" id="recipe-modal-close">✕</button>
                    ${imageHtml}
                    <div class="recipe-modal__header">
                        ${!this.image ? `<span class="recipe-modal__icon">${this.icon}</span>` : ''}
                        <div>
                            <h2 class="recipe-modal__title">${this.name}</h2>
                            <p class="recipe-modal__desc">${descText}</p>
                        </div>
                        <span class="badge recipe-modal__badge">${this.time}</span>
                    </div>
                    ${this.ingredients.length ? `
                    <div class="recipe-modal__section">
                        <h3 class="recipe-modal__label">Ингредиенты</h3>
                        <ul class="recipe-modal__list">${ingredientsList}</ul>
                    </div>` : ''}
                    ${this.steps.length ? `
                    <div class="recipe-modal__section">
                        <h3 class="recipe-modal__label">Рецепт</h3>
                        <ol class="recipe-modal__steps">${stepsList}</ol>
                    </div>` : ''}
                </div>
            </div>
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
