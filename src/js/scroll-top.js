import { spriteHref } from './sprite.js';

const button = document.createElement('button');
button.className = 'scroll-top';
button.type = 'button';
button.setAttribute('aria-label', 'Back to top');
button.hidden = true;
button.innerHTML = `
  <svg width="18" height="18" aria-hidden="true">
    <use href="${spriteHref('icon-angle-left')}"></use>
  </svg>
`;

document.body.append(button);

const update = () => {
  button.hidden = window.scrollY < 400;
};

window.addEventListener('scroll', update, { passive: true });
button.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
update();
