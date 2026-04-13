import { CoffeeRecipe } from '../models/CoffeeRecipe.js';

const recommendedMock = CoffeeRecipe.listFromJSON([
    { id: 1, name: 'Flat White',  desc: 'Double ristretto with steamed milk', time: '5 min', icon: '☕', category: 'milk' },
    { id: 2, name: 'Iced Latte',  desc: 'Espresso over cold milk and ice',    time: 'Cold',  icon: '🧋', category: 'cold' },
    { id: 5, name: 'Americano',   desc: 'Strong espresso with hot water',     time: 'Easy',  icon: '🫖', category: 'espresso' },
]);

const HomePage = () => `
    <nav class="tab-nav">
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/">Home</button>
        <button class="tab-nav__tab" data-link="/chat">AI Chat</button>
        <button class="tab-nav__tab" data-link="/catalog">Catalog</button>
        <button class="tab-nav__tab" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen screen--home">
        <div class="hero">
            <div class="hero__text">
                <h1 class="hero__greeting">Good morning,<br>Alex ☕</h1>
                <p class="hero__sub">Based on your taste profile, here's what we recommend today</p>
            </div>
            <div class="hero__icon">☕</div>
        </div>

        <section class="section">
            <h2 class="section__label">RECOMMENDED FOR YOU</h2>
            <div class="rec-list">
                ${recommendedMock.map(r => r.renderRecCard()).join('')}
            </div>
        </section>

        <section class="section">
            <h2 class="section__label">QUICK ACCESS</h2>
            <div class="quick-access">
                <div class="quick-access__item" data-link="/catalog">
                    <span class="quick-access__icon">📖</span>
                    <div>
                        <div class="quick-access__title">All recipes</div>
                        <div class="quick-access__sub">24 drinks</div>
                    </div>
                </div>
                <div class="quick-access__item" data-link="/preferences">
                    <span class="quick-access__icon">⚙️</span>
                    <div>
                        <div class="quick-access__title">My preferences</div>
                        <div class="quick-access__sub">Edit profile</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
`;

export default HomePage;
