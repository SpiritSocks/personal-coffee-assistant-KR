const ChatPage = () => {
    return `
    <nav class="tab-nav">
        <button class="tab" data-link="/">Home</button>
        <button class="tab active" data-link="/chat">AI Chat</button>
        <button class="tab" data-link="/recipe">Recipe</button>
        <button class="tab" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen chat-screen">
        <div class="chat-header">
            <h2 class="chat-header-title">Кофейный помощник</h2>
            <p class="chat-header-sub">Помогает (надо ИИ вставить)</p>
        </div>

        <div class="chat-messages" id="chat-messages">
            <div class="msg msg-bot">
                <p class="msg-text">Привет, Алекс! Судя по твоим предпочтениям (крепкий, с молоком), сегодня я бы предложил Флэт Уайт. Хочешь пошаговый рецепт?</p>
                <span class="msg-time">09:41</span>
            </div>
            <div class="msg msg-user">
                <p class="msg-text">А если у меня нет кофемашины?</p>
                <span class="msg-time">09:42</span>
            </div>
            <div class="msg msg-bot typing-indicator">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
        </div>

        <div class="chat-input-row">
            <input type="text" class="chat-input" id="chat-input" placeholder="Спросите о кофе...">
            <button class="chat-send-btn" id="chat-send">Отправить</button>
        </div>

        <section class="section">
            <h2 class="section-label">ПРЕДЛОЖЕННЫЕ ВОПРОСЫ</h2>
            <div class="suggestions-row">
                <button class="suggestion-chip">Что подойдёт под моё настроение?</button>
                <button class="suggestion-chip">Как сделать покрепче?</button>
                <button class="suggestion-chip">Лучший холодный вариант?</button>
                <button class="suggestion-chip">Какие зёрна купить?</button>
            </div>
        </section>
    </div>
    `;
}

export default ChatPage;
