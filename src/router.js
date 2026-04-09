import * as Home from "./pages/home.js";
import * as Chat from "./pages/chat.js";
import * as Catalog from "./pages/catalog.js";
import * as Preferences from "./pages/preferences.js";

const routes = {
    '/':            Home,
    '/chat':        Chat,
    '/catalog':     Catalog,
    '/preferences': Preferences,
};

function getPath() {
    return window.location.hash.slice(1) || '/';
}

function navigate(path) {
    window.location.hash = path;
}

function render() {
    const full = getPath();
    const path = full.split('?')[0];
    const mod = routes[path] ?? Home;

    document.getElementById('app').innerHTML = mod.default(full);
    bindLinks();
    if (typeof mod.mount === 'function') mod.mount();
}

function bindLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.link);
    });
  });
}

window.addEventListener('hashchange', render);
export { render };
