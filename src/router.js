import HomePage from "./pages/home.js";

const routes = {
    '/': HomePage,
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
    const fn = routes[path] ?? HomePage;

    document.getElementById('app').innerHTML = fn(full);
    bindLinks();
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