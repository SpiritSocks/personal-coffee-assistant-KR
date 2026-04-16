var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=class e{constructor({id:e,name:t,desc:n,time:r,icon:i,category:a,steps:o=[],ingredients:s=[],fullDesc:c=``,image:l=null}){this.id=e,this.name=t,this.desc=n,this.time=r,this.icon=i,this.category=a,this.steps=o,this.ingredients=s,this.fullDesc=c,this.image=l}matchesCategory(e){return e===`all`||this.category===e}matchesQuery(e){let t=(e||``).trim().toLowerCase();return t?this.name.toLowerCase().includes(t)||this.desc.toLowerCase().includes(t):!0}renderCatalogCard(){return`
            <article class="catalog-card" data-id="${this.id}">
                <div class="catalog-card__icon">${this.icon}</div>
                <div class="catalog-card__info">
                    <h3 class="catalog-card__title">${this.name}</h3>
                    <p class="catalog-card__desc">${this.desc}</p>
                    <span class="badge">${this.time}</span>
                </div>
            </article>
        `}renderRecCard(e=this.time){return`
            <article class="rec-card" data-id="${this.id}">
                <span class="rec-card__emoji">${this.icon}</span>
                <h3 class="rec-card__title">${this.name}</h3>
                <p class="rec-card__desc">${this.desc}</p>
                <span class="badge">${e}</span>
            </article>
        `}renderModal(){let e=this.ingredients.map(e=>`<li class="recipe-modal__ingredient">${e}</li>`).join(``),t=this.steps.map((e,t)=>`<li class="recipe-modal__step"><span class="recipe-modal__step-num">${t+1}</span>${e}</li>`).join(``),n=this.image?`<img class="recipe-modal__img" src="${this.image}" alt="${this.name}">`:``,r=this.fullDesc||this.desc;return`
            <div class="recipe-modal__backdrop" id="recipe-modal">
                <div class="recipe-modal">
                    <button class="recipe-modal__close" id="recipe-modal-close">✕</button>
                    ${n}
                    <div class="recipe-modal__header">
                        ${this.image?``:`<span class="recipe-modal__icon">${this.icon}</span>`}
                        <div>
                            <h2 class="recipe-modal__title">${this.name}</h2>
                            <p class="recipe-modal__desc">${r}</p>
                        </div>
                        <span class="badge recipe-modal__badge">${this.time}</span>
                    </div>
                    ${this.ingredients.length?`
                    <div class="recipe-modal__section">
                        <h3 class="recipe-modal__label">Ингредиенты</h3>
                        <ul class="recipe-modal__list">${e}</ul>
                    </div>`:``}
                    ${this.steps.length?`
                    <div class="recipe-modal__section">
                        <h3 class="recipe-modal__label">Рецепт</h3>
                        <ol class="recipe-modal__steps">${t}</ol>
                    </div>`:``}
                </div>
            </div>
        `}static fromJSON(t){return new e(t)}static listFromJSON(t){return t.map(e.fromJSON)}},r=n.listFromJSON([{id:`f1`,name:`Эспрессо`,desc:`Концентрированный чистый шот`,time:`1 мин`,icon:`☕`,category:`espresso`,ingredients:[`9г молотого кофе`,`30мл воды 90°C`],steps:[`Смелите кофе мелко, засыпьте в портафильтр.`,`Утрамбуйте темпером с усилием ~15 кг.`,`Запустите экстракцию на 25–30 секунд.`]},{id:`f2`,name:`Американо`,desc:`Эспрессо с горячей водой`,time:`2 мин`,icon:`☕`,category:`espresso`,ingredients:[`30мл эспрессо`,`120мл горячей воды`],steps:[`Сварите одинарный эспрессо.`,`Нагрейте воду до 80–85°C.`,`Добавьте воду в эспрессо (не наоборот).`]},{id:`f3`,name:`Капучино`,desc:`Эспрессо со взбитым молоком`,time:`5 мин`,icon:`☕`,category:`espresso`,ingredients:[`30мл эспрессо`,`120мл цельного молока`],steps:[`Сварите одинарный эспрессо в чашку 180мл.`,`Взбейте молоко до густой пены при 60°C.`,`Влейте молоко и выложите пену сверху.`]},{id:`f4`,name:`Флэт Уайт`,desc:`Бархатный двойной ристретто`,time:`5 мин`,icon:`☕`,category:`milk`,ingredients:[`18г молотого кофе`,`60мл воды 90°C`,`120мл цельного молока`],steps:[`Сварите двойной ристретто (60мл).`,`Нагрейте молоко до 60°C, взбейте в плотную микропену.`,`Влейте молоко круговым движением.`]},{id:`f5`,name:`Кортадо`,desc:`Эспрессо и молоко 1:1`,time:`4 мин`,icon:`🍵`,category:`milk`,ingredients:[`60мл эспрессо`,`60мл цельного молока`],steps:[`Сварите двойной эспрессо.`,`Нагрейте молоко до 60°C, слегка взбейте без густой пены.`,`Влейте молоко в соотношении 1:1.`]},{id:`f6`,name:`Латте`,desc:`Эспрессо с паровым молоком`,time:`5 мин`,icon:`☕`,category:`milk`,ingredients:[`30мл эспрессо`,`200мл молока`],steps:[`Сварите эспрессо.`,`Взбейте молоко до кремовой текстуры.`,`Влейте молоко в эспрессо, оставив немного пены сверху.`]},{id:`f7`,name:`Пуровер`,desc:`Чистый яркий вкус`,time:`8 мин`,icon:`🫖`,category:`espresso`,ingredients:[`25г кофе среднего помола`,`400мл воды 93°C`],steps:[`Смочите фильтр, засыпьте кофе.`,`Влейте 50мл воды для цветения, подождите 30 сек.`,`Медленно вливайте воду по кругу за 3–4 минуты.`]},{id:`f8`,name:`Колд Брю`,desc:`Долгое холодное настаивание`,time:`12ч`,icon:`🧊`,category:`cold`,ingredients:[`100г кофе крупного помола`,`800мл холодной воды`],steps:[`Смешайте кофе и холодную воду в банке.`,`Настаивайте 12–24ч в холодильнике.`,`Процедите через мелкое сито и подавайте со льдом.`]},{id:`f9`,name:`Айс Латте`,desc:`Эспрессо на льду с молоком`,time:`3 мин`,icon:`🧋`,category:`cold`,ingredients:[`30мл эспрессо`,`200мл молока`,`Лёд`],steps:[`Сварите эспрессо и дайте остыть.`,`Наполните стакан льдом.`,`Влейте молоко, затем эспрессо сверху.`]},{id:`f10`,name:`Мокко`,desc:`Эспрессо с шоколадом`,time:`6 мин`,icon:`🍫`,category:`milk`,ingredients:[`30мл эспрессо`,`20г шоколадного сиропа`,`150мл молока`,`Взбитые сливки`],steps:[`Смешайте горячий эспрессо с шоколадным сиропом.`,`Влейте взбитое молоко.`,`Украсьте взбитыми сливками.`]},{id:`f11`,name:`Доппио`,desc:`Двойной эспрессо`,time:`2 мин`,icon:`☕`,category:`espresso`,ingredients:[`18г молотого кофе`,`60мл воды 90°C`],steps:[`Смелите 18г кофе мелко.`,`Засыпьте и утрамбуйте в портафильтр.`,`Экстрагируйте двойной шот 25–30 сек.`]},{id:`f12`,name:`Ристретто`,desc:`Концентрированный короткий шот`,time:`1 мин`,icon:`☕`,category:`espresso`,ingredients:[`9г молотого кофе`,`15–20мл воды 90°C`],steps:[`Смелите кофе мельче обычного.`,`Утрамбуйте плотнее стандартного.`,`Остановите экстракцию на 15–20мл.`]},{id:`f13`,name:`Макиато`,desc:`Эспрессо с каплей молочной пены`,time:`3 мин`,icon:`☕`,category:`milk`,ingredients:[`30мл эспрессо`,`30мл молока`],steps:[`Сварите одинарный эспрессо.`,`Взбейте небольшое количество молока в густую пену.`,`Выложите 1–2 ч.л. пены поверх эспрессо.`]},{id:`f14`,name:`Латте Макиато`,desc:`Молоко с эспрессо слоями`,time:`5 мин`,icon:`🧋`,category:`milk`,ingredients:[`30мл эспрессо`,`200мл молока`],steps:[`Взбейте молоко, налейте в высокий стакан.`,`Медленно влейте эспрессо через пену — получатся слои.`,`Подавайте сразу, не перемешивая.`]},{id:`f15`,name:`Айс Американо`,desc:`Холодный американо со льдом`,time:`2 мин`,icon:`🧊`,category:`cold`,ingredients:[`60мл эспрессо`,`150мл воды`,`Лёд`],steps:[`Сварите двойной эспрессо.`,`Наполните стакан льдом, добавьте холодную воду.`,`Влейте эспрессо сверху.`]},{id:`f16`,name:`Фраппе`,desc:`Взбитый холодный кофе`,time:`5 мин`,icon:`🥤`,category:`cold`,ingredients:[`2 ч.л. растворимого кофе`,`2 ч.л. сахара`,`50мл воды`,`Лёд`,`100мл молока`],steps:[`Взбейте кофе, сахар и воду до густой пены.`,`Наполните стакан льдом.`,`Влейте пену, добавьте молоко.`]},{id:`f17`,name:`Нитро-кофе`,desc:`Кофе с азотом, кремовая пена`,time:`3 мин`,icon:`🍺`,category:`cold`,ingredients:[`200мл Колд Брю`,`Азотный баллон`],steps:[`Приготовьте Колд Брю заранее (12–24ч).`,`Зарядите кофе азотом через диспенсер.`,`Налейте в стакан без льда.`]},{id:`f18`,name:`Аффогато`,desc:`Эспрессо с шариком мороженого`,time:`3 мин`,icon:`🍨`,category:`milk`,ingredients:[`60мл эспрессо`,`1 шарик ванильного мороженого`],steps:[`Сварите двойной горячий эспрессо.`,`Положите шарик мороженого в небольшой бокал.`,`Вылейте горячий эспрессо прямо на мороженое.`]},{id:`f19`,name:`Ванильный Латте`,desc:`Латте с ванильным сиропом`,time:`5 мин`,icon:`☕`,category:`milk`,ingredients:[`30мл эспрессо`,`200мл молока`,`15мл ванильного сиропа`],steps:[`Сварите эспрессо.`,`Добавьте ванильный сироп в чашку.`,`Влейте эспрессо и взбитое молоко.`]},{id:`f20`,name:`Дальгона`,desc:`Взбитый крем из кофе`,time:`7 мин`,icon:`🍮`,category:`cold`,ingredients:[`2 ст.л. растворимого кофе`,`2 ст.л. сахара`,`2 ст.л. горячей воды`,`200мл молока`,`Лёд`],steps:[`Взбейте кофе, сахар и воду миксером до густого крема (3–5 мин).`,`Наполните стакан льдом и молоком.`,`Выложите кофейный крем поверх молока.`]}]),i={f1:5,f2:4,f3:3,f4:4,f5:4,f6:2,f7:4,f8:3,f9:2,f10:2,f11:5,f12:5,f13:3,f14:2,f15:4,f16:1,f17:3,f18:3,f19:2,f20:1};function a(e){return r.map(t=>{let n=0;e.milk&&t.category===`milk`&&(n+=3),!e.milk&&t.category===`espresso`&&(n+=3);let r=i[String(t.id)]??3;return n+=Math.max(0,3-Math.abs(e.strength-r)),e.sugar&&[`f10`,`f16`,`f19`,`f20`].includes(String(t.id))&&(n+=2),{recipe:t,score:n}}).sort((e,t)=>t.score-e.score).slice(0,3).map(e=>e.recipe)}var o=t({default:()=>d}),s=`coffee-prefs`,c=`coffee-user-name`,l={strength:3,milk:!0,sugar:!1},u=()=>{try{let e=localStorage.getItem(s);return e?{...l,...JSON.parse(e)}:{...l}}catch{return{...l}}},d=()=>{let e=a(u());return`
    <nav class="tab-nav">
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/">Главная</button>
        <button class="tab-nav__tab" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--home">
        <div class="hero">
            <div class="hero__text">
                <h1 class="hero__greeting">Доброе утро,<br>${localStorage.getItem(c)||`друг`} ☕</h1>
                <p class="hero__sub">По вашему вкусовому профилю — вот что рекомендуем сегодня</p>
            </div>
            <div class="hero__icon">☕</div>
        </div>

        <section class="section">
            <h2 class="section__label">РЕКОМЕНДУЕМ ВАМ</h2>
            <div class="rec-list">
                ${e.map(e=>e.renderRecCard()).join(``)}
            </div>
        </section>

        <section class="section">
            <h2 class="section__label">БЫСТРЫЙ ДОСТУП</h2>
            <div class="quick-access">
                <div class="quick-access__item" data-link="/catalog">
                    <span class="quick-access__icon">📖</span>
                    <div>
                        <div class="quick-access__title">Все рецепты</div>
                        <div class="quick-access__sub">Каталог напитков</div>
                    </div>
                </div>
                <div class="quick-access__item" data-link="/preferences">
                    <span class="quick-access__icon">⚙️</span>
                    <div>
                        <div class="quick-access__title">Мои настройки</div>
                        <div class="quick-access__sub">Изменить профиль</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `},f=`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`,p=`llama-3.1-8b-instant`,m=`https://api.groq.com/openai/v1/chat/completions`,h=`Ты — дружелюбный кофейный помощник. Помогаешь пользователю выбрать кофе, рассказываешь рецепты и отвечаешь на вопросы о кофе.
Отвечай коротко и по делу (2–4 предложения). Отвечай на том же языке, на котором пишет пользователь.`,ee=class{constructor(){this.history=[{role:`system`,content:h}]}setPrefsContext(e){let t=[``,`мягкий`,`лёгкий`,`средний`,`крепкий`,`очень крепкий`][e.strength]??`средний`,n=[e.milk&&`с молоком`,e.sugar&&`с сахаром`].filter(Boolean).join(`, `)||`без добавок`;this.history[0]={role:`system`,content:`${h}\nПредпочтения пользователя: ${t} кофе, ${n}.`}}async send(e){this.history.push({role:`user`,content:e});let t=await fetch(m,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${f}`},body:JSON.stringify({model:p,messages:this.history})});if(!t.ok){this.history.pop();let e=await t.json().catch(()=>({}));throw console.error(`Groq error:`,t.status,e),Error(`API_ERROR_${t.status}`)}let n=(await t.json()).choices[0].message.content;return this.history.push({role:`assistant`,content:n}),n}reset(){this.history=[this.history[0]]}},g=t({default:()=>y,mount:()=>w}),_=`coffee-prefs`,v=()=>{try{let e=localStorage.getItem(_);return e?JSON.parse(e):null}catch{return null}},y=()=>`
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
                    <span class="msg__time">${b()}</span>
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
`;function b(){return new Date().toLocaleTimeString(`ru-RU`,{hour:`2-digit`,minute:`2-digit`})}function x(e,t,n){let r=document.createElement(`div`);r.className=`msg msg--${n}`,r.innerHTML=`<p class="msg__text">${C(t)}</p><span class="msg__time">${b()}</span>`,e.appendChild(r),e.scrollTop=e.scrollHeight}function S(e){let t=document.createElement(`div`);return t.className=`msg msg--bot msg--typing`,t.innerHTML=`<span class="msg__dot"></span><span class="msg__dot"></span><span class="msg__dot"></span>`,e.appendChild(t),e.scrollTop=e.scrollHeight,t}function C(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var w=()=>{let e=document.getElementById(`chat-form`),t=document.getElementById(`chat-input`),n=document.getElementById(`chat-messages`);if(!e||!t||!n)return;let r=new ee,i=v();i&&r.setPrefsContext(i);let a=!1;async function o(e){if(e=e.trim(),!e||a)return;a=!0,x(n,e,`user`),t.value=``;let i=S(n);try{let t=await r.send(e);i.remove(),x(n,t,`bot`)}catch{i.remove(),x(n,`Ошибка соединения. Попробуйте ещё раз.`,`bot`)}finally{a=!1}}e.addEventListener(`submit`,e=>{e.preventDefault(),o(t.value)}),document.querySelectorAll(`.suggestions__chip`).forEach(e=>{e.addEventListener(`click`,()=>o(e.textContent))})},T=t({default:()=>I,mount:()=>B}),E=`https://www.thecocktaildb.com/api/json/v1/1`,D=6;function te(e){let t=[];for(let n=1;n<=15;n++){let r=e[`strIngredient${n}`],i=e[`strMeasure${n}`];r&&r.trim()&&t.push(i?`${i.trim()} ${r.trim()}`:r.trim())}return t}function O(e){return e?e.split(/(?:\r?\n|(?<=\.)\s+(?=[A-ZА-Я]))/).map(e=>e.trim()).filter(e=>e.length>10):[]}var k=[`☕`,`☕`,`☕`,`☕`,`☕`,`☕`,`🧋`,`🧊`,`🧋`,`🧊`],A=[{id:`all`,label:`Все`},{id:`espresso`,label:`Эспрессо`},{id:`milk`,label:`С молоком`},{id:`cold`,label:`Холодные`}],j=`all`,M=``,N=[],P=!1,F=()=>{let e=N.filter(e=>e.matchesCategory(j)&&e.matchesQuery(M));if(e.length===0)return`<p class="catalog__empty">Рецепты не найдены</p>`;let t=P?e:e.slice(0,D),n=e.length>D;return t.map(e=>e.renderCatalogCard()).join(``)+(n?`
        <button class="catalog__show-more" id="catalog-show-more">
            ${P?`Свернуть`:`Показать ещё ${e.length-D}`}
            <span class="catalog__show-more-arrow${P?` catalog__show-more-arrow--up`:``}">▼</span>
        </button>`:``)},I=()=>`
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Главная</button>
        <button class="tab-nav__tab" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--catalog">
        <div class="catalog">
            <input type="text" class="catalog__search" id="catalog-search"
                   placeholder="Поиск рецептов..." value="${M}">
            <div class="catalog__filters" id="catalog-filters">
                ${A.map(e=>`
                    <button class="catalog__filter${e.id===j?` catalog__filter--active`:``}"
                            data-category="${e.id}">${e.label}</button>
                `).join(``)}
            </div>
            <div class="catalog__grid" id="catalog-grid">
                ${r.slice(0,D).map(e=>e.renderCatalogCard()).join(``)}
                <button class="catalog__show-more" id="catalog-show-more">
                    Показать ещё ${r.length-D}
                    <span class="catalog__show-more-arrow">▼</span>
                </button>
            </div>
        </div>
    </div>
`;async function L(){N=r;try{let e=new AbortController,t=setTimeout(()=>e.abort(),5e3),i=await fetch(`${E}/filter.php?c=Coffee%20%2F%20Tea`,{signal:e.signal});clearTimeout(t);let a=((await i.json()).drinks||[]).slice(0,6);if(!a.length)return;let o=(await Promise.all(a.map(e=>fetch(`${E}/lookup.php?i=${e.idDrink}`).then(e=>e.json()).then(e=>e.drinks?.[0]).catch(()=>null)))).filter(Boolean).map((e,t)=>n.fromJSON({id:`api-${e.idDrink}`,name:e.strDrink,desc:(e.strInstructions??``).slice(0,65).trim()+`…`,time:`5 мин`,icon:k[t%k.length],category:`espresso`,ingredients:te(e),steps:O(e.strInstructions),fullDesc:e.strInstructions??``,image:e.strDrinkThumb??null}));if(o.length){N=[...r,...o];let e=document.getElementById(`catalog-grid`);e&&(e.innerHTML=F())}}catch{}}function R(e){let t=N.find(t=>t.id==e);if(!t)return;document.body.insertAdjacentHTML(`beforeend`,t.renderModal());let n=document.getElementById(`recipe-modal`);document.getElementById(`recipe-modal-close`).addEventListener(`click`,z),n.addEventListener(`click`,e=>{e.target===n&&z()})}function z(){document.getElementById(`recipe-modal`)?.remove()}var B=async()=>{let e=document.getElementById(`catalog-search`),t=document.getElementById(`catalog-filters`),n=document.getElementById(`catalog-grid`);!e||!t||!n||(N=r,L(),e.addEventListener(`input`,e=>{M=e.target.value,P=!1,n.innerHTML=F()}),t.addEventListener(`click`,e=>{let r=e.target.closest(`[data-category]`);r&&(j=r.dataset.category,P=!1,t.querySelectorAll(`.catalog__filter`).forEach(e=>e.classList.toggle(`catalog__filter--active`,e.dataset.category===j)),n.innerHTML=F())}),n.addEventListener(`click`,e=>{if(e.target.closest(`#catalog-show-more`)){P=!P,n.innerHTML=F();return}let t=e.target.closest(`[data-id]`);t&&R(t.dataset.id)}))},V=t({default:()=>q,mount:()=>J}),H=`coffee-prefs`,U={strength:3,milk:!0,sugar:!1},W=()=>{try{let e=localStorage.getItem(H);return e?{...U,...JSON.parse(e)}:{...U}}catch{return{...U}}},G=e=>{localStorage.setItem(H,JSON.stringify(e))},K=W(),q=()=>(K=W(),`
    <nav class="tab-nav">
        <button class="tab-nav__tab" data-link="/">Главная</button>
        <button class="tab-nav__tab" data-link="/chat">ИИ Чат</button>
        <button class="tab-nav__tab" data-link="/catalog">Каталог</button>
        <button class="tab-nav__tab tab-nav__tab--active" data-link="/preferences">Настройки</button>
    </nav>

    <div class="screen screen--preferences">
        <div class="prefs">
            <div class="prefs__card">
                <h2 class="prefs__title">Крепость кофе</h2>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value="${K.strength}"
                    class="prefs__slider"
                    id="pref-strength"
                >
                <div class="prefs__slider-labels">
                    <span>Мягкий</span>
                    <span>Крепкий</span>
                </div>
            </div>

            <div class="prefs__card">
                <h2 class="prefs__title">Добавки</h2>
                <div class="prefs__row">
                    <span class="prefs__label">С молоком</span>
                    <label class="toggle">
                        <input type="checkbox" class="toggle__input" id="pref-milk" ${K.milk?`checked`:``}>
                        <span class="toggle__track"><span class="toggle__thumb"></span></span>
                    </label>
                </div>
                <div class="prefs__divider"></div>
                <div class="prefs__row">
                    <span class="prefs__label">С сахаром</span>
                    <label class="toggle">
                        <input type="checkbox" class="toggle__input" id="pref-sugar" ${K.sugar?`checked`:``}>
                        <span class="toggle__track"><span class="toggle__thumb"></span></span>
                    </label>
                </div>
            </div>

            <button class="prefs__save" id="pref-save">Сохранить настройки</button>
        </div>
    </div>
    `),J=()=>{let e=document.getElementById(`pref-strength`),t=document.getElementById(`pref-milk`),n=document.getElementById(`pref-sugar`),r=document.getElementById(`pref-save`);!e||!t||!n||!r||(e.addEventListener(`input`,e=>{K.strength=Number(e.target.value)}),t.addEventListener(`change`,e=>{K.milk=e.target.checked}),n.addEventListener(`change`,e=>{K.sugar=e.target.checked}),r.addEventListener(`click`,()=>{G(K);let e=r.textContent;r.textContent=`Сохранено ✓`,r.classList.add(`prefs__save--saved`),setTimeout(()=>{r.textContent=e,r.classList.remove(`prefs__save--saved`)},1500)}))},Y={"/":o,"/chat":g,"/catalog":T,"/preferences":V};function X(){return window.location.hash.slice(1)||`/`}function Z(e){window.location.hash=e}function Q(){let e=X(),t=Y[e.split(`?`)[0]]??o;document.getElementById(`app`).innerHTML=t.default(e),ne(),typeof t.mount==`function`&&t.mount()}function ne(){document.querySelectorAll(`[data-link]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),Z(e.dataset.link)})})}window.addEventListener(`hashchange`,Q);var $=`coffee-user-name`;function re(){return new Promise(e=>{let t=document.createElement(`div`);t.className=`name-popup__overlay`,t.innerHTML=`
            <div class="name-popup">
                <div class="name-popup__icon">☕</div>
                <h2 class="name-popup__title">Добро пожаловать!</h2>
                <p class="name-popup__sub">Как вас называть?</p>
                <input class="name-popup__input" id="name-input" type="text"
                       placeholder="Введите имя..." maxlength="30" autocomplete="off">
                <button class="name-popup__btn" id="name-confirm">Начать</button>
            </div>
        `,document.body.appendChild(t);let n=t.querySelector(`#name-input`),r=t.querySelector(`#name-confirm`);n.focus();function i(){let r=n.value.trim();if(!r){n.focus();return}localStorage.setItem($,r),t.classList.add(`name-popup__overlay--out`),t.addEventListener(`animationend`,()=>{t.remove(),e()},{once:!0})}r.addEventListener(`click`,i),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&i()})})}async function ie(){localStorage.getItem($)||await re(),Q()}ie();