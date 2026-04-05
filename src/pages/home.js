
const HomePage = () => {
    return `
    <nav class="tab-nav">
        <button class="tab active" data-link="/">Home</button>
        <button class="tab" data-link="/chat">AI Chat</button>
        <button class="tab" data-link="/recipe">Recipe</button>
        <button class="tab" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen home-screen">
        <div class="hero-card">
            <div class="hero-text">
                <h1 class="hero-greeting">Good morning,<br>Alex ☕</h1>
                <p class="hero-sub">Based on your taste profile, here's what we recommend today</p>
            </div>
            <div class="hero-icon">☕</div>
        </div>

        <section class="section">
            <h2 class="section-label">RECOMMENDED FOR YOU</h2>
            <div class="cards-row">
                <div class="rec-card">
                    <span class="rec-emoji">☕</span>
                    <h3 class="rec-title">Flat White</h3>
                    <p class="rec-desc">Double ristretto with steamed milk</p>
                    <span class="badge">5 min</span>
                </div>
                <div class="rec-card">
                    <span class="rec-emoji">🧋</span>
                    <h3 class="rec-title">Iced Latte</h3>
                    <p class="rec-desc">Espresso over cold milk and ice</p>
                    <span class="badge">Cold</span>
                </div>
                <div class="rec-card">
                    <span class="rec-emoji">🫖</span>
                    <h3 class="rec-title">Americano</h3>
                    <p class="rec-desc">Strong espresso with hot water</p>
                    <span class="badge">Easy</span>
                </div>
            </div>
        </section>
    </div>
    `;
}

export default HomePage;