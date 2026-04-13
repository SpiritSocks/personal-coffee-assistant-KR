const API_KEY = 'GROQ_KEY_REMOVED';
const MODEL = 'llama-3.1-8b-instant';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `Ты — дружелюбный кофейный помощник. Помогаешь пользователю выбрать кофе, рассказываешь рецепты и отвечаешь на вопросы о кофе.
Отвечай коротко и по делу (2–4 предложения). Отвечай на том же языке, на котором пишет пользователь.`;

export class AIService {
    constructor() {
        this.history = [{ role: 'system', content: SYSTEM_PROMPT }];
    }

    setPrefsContext(prefs) {
        const strengthLabel = ['', 'мягкий', 'лёгкий', 'средний', 'крепкий', 'очень крепкий'][prefs.strength] ?? 'средний';
        const extras = [prefs.milk && 'с молоком', prefs.sugar && 'с сахаром'].filter(Boolean).join(', ') || 'без добавок';
        this.history[0] = {
            role: 'system',
            content: `${SYSTEM_PROMPT}\nПредпочтения пользователя: ${strengthLabel} кофе, ${extras}.`,
        };
    }

    async send(userText) {
        this.history.push({ role: 'user', content: userText });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({ model: MODEL, messages: this.history }),
        });

        if (!response.ok) {
            this.history.pop();
            const err = await response.json().catch(() => ({}));
            console.error('Groq error:', response.status, err);
            throw new Error(`API_ERROR_${response.status}`);
        }

        const data = await response.json();
        const text = data.choices[0].message.content;
        this.history.push({ role: 'assistant', content: text });
        return text;
    }

    reset() {
        const system = this.history[0];
        this.history = [system];
    }
}
