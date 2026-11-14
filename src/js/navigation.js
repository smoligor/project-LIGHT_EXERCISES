import { initFavorites, showFavorites } from './favorites.js';

const home = document.querySelector('#home-view');
const favorites = document.querySelector('#favorites-view');
const header = document.querySelector('.header');
const navLinks = [...document.querySelectorAll('.header-navigation-link')];
const navigation = document.querySelector('.header-navigation-list');

initFavorites();

function getRoute() {
  return window.location.hash === '#/favorites' ? 'favorites' : 'home';
}

function renderRoute() {
  const route = getRoute();
  if (home) home.hidden = route !== 'home';
  if (favorites) favorites.hidden = route !== 'favorites';
  if (route === 'favorites') showFavorites();

  navLinks.forEach(link => {
    const isFavorites = link.getAttribute('data-route') === 'favorites';
    const isActive = isFavorites === (route === 'favorites');
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const activeLink = navigation?.querySelector('[aria-current="page"]');
  if (activeLink && navigation) {
    const navRect = navigation.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navigation.style.setProperty(
      '--active-link-offset',
      `${linkRect.left - navRect.left}px`
    );
    navigation.style.setProperty('--active-link-width', `${linkRect.width}px`);
  }
}

navLinks.forEach(link => {
  const isFavorites = link.textContent.trim().toLowerCase() === 'favorites';
  link.dataset.route = isFavorites ? 'favorites' : 'home';
  link.href = isFavorites ? './index.html#/favorites' : './index.html#/';
});

document.addEventListener(
  'click',
  event => {
    const link = event.target.closest('.header-navigation-link');
    if (!link || !header?.contains(link)) return;
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    const targetHash =
      link.dataset.route === 'favorites' ? '#/favorites' : '#/';
    header.classList.remove('is-menu-open');
    const toggle = header.querySelector('.header-menu-toggle');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    if (window.location.hash !== targetHash) window.location.hash = targetHash;
    else renderRoute();
  },
  true
);

window.addEventListener('hashchange', renderRoute);
window.addEventListener('resize', renderRoute);
renderRoute();
