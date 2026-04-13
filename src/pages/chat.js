import { AIService } from '../services/ai.js';

const STORAGE_KEY = 'coffee-prefs';

const loadPrefs = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const ChatPage = () => `
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Главная</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--chat">
        <div class="chat">
            <header class="chat__header">
                <h2 class="chat__header-title">Кофейный помощник</h2>
                <p class="chat__header-sub">На базе Llama 3.1</p>
            </header>

            <div class="chat__messages" id="chat-messages">
                <div class="msg msg--bot">
                    <p class="msg__text">Привет! Я ваш кофейный помощник. Чем могу помочь?</p>
                    <span class="msg__time">${_now()}</span>
                </div>
            </div>

            <form class="chat__form" id="chat-form">
                <input type="text" class="chat__field" id="chat-input" placeholder="Спросите о кофе..." autocomplete="off">
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

function _now() {
    return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(container, text, role) {
    const div = document.createElement('div');
    div.className = `msg msg--${role}`;
    div.innerHTML = `<p class="msg__text">${_escape(text)}</p><span class="msg__time">${_now()}</span>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTyping(container) {
    const div = document.createElement('div');
    div.className = 'msg msg--bot msg--typing';
    div.innerHTML = '<span class="msg__dot"></span><span class="msg__dot"></span><span class="msg__dot"></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function _escape(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const mount = () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    if (!form || !input || !messages) return;

    const ai = new AIService();
    const prefs = loadPrefs();
    if (prefs) ai.setPrefsContext(prefs);

    let busy = false;

    async function handleSend(text) {
        text = text.trim();
        if (!text || busy) return;
        busy = true;

        appendMessage(messages, text, 'user');
        input.value = '';

        const typing = showTyping(messages);
        try {
            const reply = await ai.send(text);
            typing.remove();
            appendMessage(messages, reply, 'bot');
        } catch {
            typing.remove();
            appendMessage(messages, 'Ошибка соединения. Попробуйте ещё раз.', 'bot');
        } finally {
            busy = false;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSend(input.value);
    });

    document.querySelectorAll('.suggestions__chip').forEach(chip => {
        chip.addEventListener('click', () => handleSend(chip.textContent));
    });
};

export default ChatPage;
