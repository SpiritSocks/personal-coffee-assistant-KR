const ChatPage = () => `
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Home</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/chat">AI Chat</button>
        <button class="tab-nav__tab" data-link="/catalog">Catalog</button>
        <button class="tab-nav__tab" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen screen--chat">
        <div class="chat">
            <header class="chat__header">
                <h2 class="chat__header-title">Кофейный помощник</h2>
                <p class="chat__header-sub">Помогает (надо ИИ вставить)</p>
            </header>

            <div class="chat__messages" id="chat-messages">
                <div class="msg msg--bot">
                    <p class="msg__text">Привет, Алекс! Судя по твоим предпочтениям (крепкий, с молоком), сегодня я бы предложил Флэт Уайт. Хочешь пошаговый рецепт?</p>
                    <span class="msg__time">09:41</span>
                </div>
                <div class="msg msg--user">
                    <p class="msg__text">А если у меня нет кофемашины?</p>
                    <span class="msg__time">09:42</span>
                </div>
                <div class="msg msg--bot msg--typing">
                    <span class="msg__dot"></span>
                    <span class="msg__dot"></span>
                    <span class="msg__dot"></span>
                </div>
            </div>

            <form class="chat__form" id="chat-form">
                <input type="text" class="chat__field" id="chat-input" placeholder="Спросите о кофе...">
                <button type="submit" class="chat__send" id="chat-send">Отправить</button>
            </form>
        </div>

        <section class="section">
            <h2 class="section__label">ПРЕДЛОЖЕННЫЕ ВОПРОСЫ</h2>
            <div class="suggestions">
                <button class="suggestions__chip">Что подойдёт под моё настроение?</button>
                <button class="suggestions__chip">Как сделать покрепче?</button>
                <button class="suggestions__chip">Лучший холодный вариант?</button>
                <button class="suggestions__chip">Какие зёрна купить?</button>
            </div>
        </section>
    </div>
`;

export default ChatPage;
