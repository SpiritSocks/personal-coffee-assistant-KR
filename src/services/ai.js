const MODEL = "llama-3.1-8b-instant";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_KEY_STORAGE = "groq-api-key";

const SYSTEM_PROMPT = `Ты — дружелюбный кофейный помощник. Помогаешь пользователю выбрать кофе, рассказываешь рецепты и отвечаешь на вопросы о кофе.
Отвечай коротко и по делу (2–4 предложения). Отвечай на том же языке, на котором пишет пользователь.`;

export class AIServiceError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "AIServiceError";
    this.status = status;
    this.code = code;
  }
}

export class AIService {
  constructor() {
    this.history = [{ role: "system", content: SYSTEM_PROMPT }];
  }

  getApiKey() {
    try {
      return localStorage.getItem(GROQ_KEY_STORAGE)?.trim() || "";
    } catch {
      return "";
    }
  }

  setPrefsContext(prefs) {
    const strengthLabel =
      ["", "мягкий", "лёгкий", "средний", "крепкий", "очень крепкий"][
        prefs.strength
      ] ?? "средний";
    const extras =
      [prefs.milk && "с молоком", prefs.sugar && "с сахаром"]
        .filter(Boolean)
        .join(", ") || "без добавок";
    this.history[0] = {
      role: "system",
      content: `${SYSTEM_PROMPT}\nПредпочтения пользователя: ${strengthLabel} кофе, ${extras}.`,
    };
  }

  async send(userText) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new AIServiceError("Groq API key is missing", {
        code: "missing_api_key",
      });
    }

    this.history.push({ role: "user", content: userText });

    let response;
    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model: MODEL, messages: this.history }),
      });
    } catch (error) {
      this.history.pop();
      throw new AIServiceError(error.message || "Network error", {
        code: "network_error",
      });
    }

    if (!response.ok) {
      this.history.pop();
      const err = await response.json().catch(() => ({}));
      console.error("Groq error:", response.status, err);
      throw new AIServiceError(err.error?.message || "Groq API error", {
        status: response.status,
        code: err.error?.code,
      });
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    this.history.push({ role: "assistant", content: text });
    return text;
  }

  reset() {
    const system = this.history[0];
    this.history = [system];
  }
}
