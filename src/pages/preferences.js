const STORAGE_KEY = 'coffee-prefs';

const defaultPrefs = {
    strength: 3,  // 1..5
    milk: true,
    sugar: false,
};

const loadPrefs = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : { ...defaultPrefs };
    } catch {
        return { ...defaultPrefs };
    }
};

const savePrefs = (prefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

let prefs = loadPrefs();

const PreferencesPage = () => {
    prefs = loadPrefs();
    return `
    <nav class="tab-nav">
        <button class="tab" data-link="/">Home</button>
        <button class="tab" data-link="/chat">AI Chat</button>
        <button class="tab" data-link="/catalog">Catalog</button>
        <button class="tab active" data-link="/preferences">Preferences</button>
    </nav>

    <div class="screen preferences-screen">
        <div class="pref-card">
            <h2 class="pref-title">Coffee strength</h2>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value="${prefs.strength}"
                class="pref-slider"
                id="pref-strength"
            >
            <div class="pref-slider-labels">
                <span>Mild</span>
                <span>Strong</span>
            </div>
        </div>

        <div class="pref-card">
            <h2 class="pref-title">Add-ons</h2>
            <div class="pref-row">
                <span class="pref-label">With milk</span>
                <label class="toggle">
                    <input type="checkbox" id="pref-milk" ${prefs.milk ? 'checked' : ''}>
                    <span class="toggle-track"><span class="toggle-thumb"></span></span>
                </label>
            </div>
            <div class="pref-divider"></div>
            <div class="pref-row">
                <span class="pref-label">With sugar</span>
                <label class="toggle">
                    <input type="checkbox" id="pref-sugar" ${prefs.sugar ? 'checked' : ''}>
                    <span class="toggle-track"><span class="toggle-thumb"></span></span>
                </label>
            </div>
        </div>

        <button class="pref-save" id="pref-save">Save & regenerate AI recommendation</button>
    </div>
    `;
};

export const mount = () => {
    const strengthEl = document.getElementById('pref-strength');
    const milkEl = document.getElementById('pref-milk');
    const sugarEl = document.getElementById('pref-sugar');
    const saveBtn = document.getElementById('pref-save');

    if (!strengthEl || !milkEl || !sugarEl || !saveBtn) return;

    strengthEl.addEventListener('input', (e) => {
        prefs.strength = Number(e.target.value);
    });
    milkEl.addEventListener('change', (e) => {
        prefs.milk = e.target.checked;
    });
    sugarEl.addEventListener('change', (e) => {
        prefs.sugar = e.target.checked;
    });

    saveBtn.addEventListener('click', () => {
        savePrefs(prefs);
        const original = saveBtn.textContent;
        saveBtn.textContent = 'Saved ✓';
        saveBtn.classList.add('saved');
        setTimeout(() => {
            saveBtn.textContent = original;
            saveBtn.classList.remove('saved');
        }, 1500);
    });
};

export default PreferencesPage;
