import { addExerciseRating, getExerciseById } from './api.js';
import { EMAIL_PATTERN } from './constants.js';
import { isFavorite, toggleFavorite } from './favorites-storage.js';
import { hideLoader, showLoader } from './loader.js';
import { spriteHref } from './sprite.js';

let currentExercise = null;
let lastTrigger = null;
let openToken = 0;
let ratingOpen = false;

const refs = {};

export function initExerciseModal() {
  refs.modal = document.querySelector('[data-exercise-modal]');
  refs.dialog = document.querySelector('[data-modal-dialog]');
  refs.content = document.querySelector('[data-modal-content]');
  refs.closeButtons = document.querySelectorAll('[data-modal-close]');

  if (!refs.modal || !refs.content) {
    return;
  }

  refs.modal
    .querySelector('[data-close-icon]')
    ?.setAttribute('href', spriteHref('icon-close'));

  refs.closeButtons.forEach(button => {
    button.addEventListener('click', onDismiss);
  });

  refs.modal.addEventListener('click', onModalClick);
  refs.content.addEventListener('click', onContentClick);
  refs.content.addEventListener('submit', onRatingSubmit);
  document.addEventListener('exercise:open', event => {
    openExerciseModal(event.detail?.id);
  });
}

async function openExerciseModal(id) {
  if (!id || !refs.modal) {
    return;
  }

  const token = ++openToken;
  lastTrigger = document.activeElement;
  currentExercise = null;
  refs.modal.hidden = false;
  document.body.classList.add('is-modal-open');
  document.removeEventListener('keydown', onKeydown);
  document.addEventListener('keydown', onKeydown);
  ratingOpen = false;
  renderStatus('Loading...');
  refs.dialog?.focus();
  showLoader();

  try {
    const exercise = await getExerciseById(id);

    if (token !== openToken) {
      return;
    }

    currentExercise = exercise;
    renderExercise(exercise);
  } catch {
    if (token !== openToken) {
      return;
    }

    currentExercise = null;
    renderStatus('Could not load this exercise. Please try again.');
  } finally {
    hideLoader();
  }
}

function onDismiss() {
  if (ratingOpen) {
    closeRating();
    return;
  }

  closeExerciseModal();
}

function closeRating() {
  ratingOpen = false;

  if (currentExercise) {
    renderExercise(currentExercise);
    refs.dialog?.focus();
    return;
  }

  closeExerciseModal();
}

function closeExerciseModal() {
  if (!refs.modal || refs.modal.hidden) {
    return;
  }

  ratingOpen = false;
  openToken += 1;
  refs.modal.hidden = true;
  document.body.classList.remove('is-modal-open');
  document.removeEventListener('keydown', onKeydown);
  refs.content.replaceChildren();
  currentExercise = null;

  if (lastTrigger instanceof HTMLElement) {
    lastTrigger.focus();
  }
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    onDismiss();
    return;
  }

  if (event.key === 'Tab') {
    trapFocus(event);
  }
}

function onModalClick(event) {
  if (event.target === refs.modal || event.target.closest('[data-modal-backdrop]')) {
    onDismiss();
  }
}

function onContentClick(event) {
  if (event.target.closest('[data-open-rating]')) {
    openRating();
    return;
  }

  onFavoriteClick(event);
}

function openRating() {
  if (!currentExercise) {
    return;
  }

  ratingOpen = true;
  refs.content.innerHTML = renderRatingForm();
  refs.content.querySelector('[name="review"]')?.focus();
}

async function onRatingSubmit(event) {
  const form = event.target.closest('.rating-form');

  if (!form || !currentExercise) {
    return;
  }

  event.preventDefault();
  const error = form.querySelector('[data-rating-error]');
  const email = String(new FormData(form).get('email') || '').trim();
  const review = String(new FormData(form).get('review') || '').trim();
  const rate = Number(new FormData(form).get('rate'));

  if (!rate || !review || !EMAIL_PATTERN.test(email)) {
    form.reportValidity();
    if (error) {
      error.textContent = 'Fill in the rating, review, and a valid email.';
    }
    return;
  }

  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  if (error) error.textContent = '';
  showLoader();

  try {
    const updated = await addExerciseRating(currentExercise._id, {
      rate,
      email,
      review,
    });
    const nextRating = Number(updated?.rating);
    currentExercise = {
      ...currentExercise,
      rating: Number.isFinite(nextRating) ? nextRating : currentExercise.rating,
    };
    closeRating();
  } catch (requestError) {
    const message = readErrorMessage(requestError);

    if (error) error.textContent = message;
    showNotice(message);
  } finally {
    hideLoader();
    if (submitButton.isConnected) submitButton.disabled = false;
  }
}

function readErrorMessage(error) {
  const data = error?.response?.data;
  const message = data && typeof data === 'object' ? data.message : data;
  if (typeof message === 'string' && message.trim()) return message.trim();
  return 'Could not save the rating. Please try again.';
}

function trapFocus(event) {
  if (!refs.dialog) return;

  const focusable = [...refs.dialog.querySelectorAll('button, input, textarea, a[href]')].filter(
    element => !element.disabled && element.tabIndex !== -1
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || active === refs.dialog)) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function showNotice(text) {
  let notice = document.querySelector('.app-notice');

  if (!notice) {
    notice = document.createElement('p');
    notice.className = 'app-notice';
    notice.setAttribute('role', 'alert');
    document.body.append(notice);
  }

  notice.textContent = text;
  notice.hidden = false;
  window.clearTimeout(showNotice.timer);
  showNotice.timer = window.setTimeout(() => {
    notice.hidden = true;
  }, 4000);
}

function renderRatingForm() {
  const stars = [1, 2, 3, 4, 5]
    .map(
      value => `
        <label class="rating-choice">
          <input type="radio" name="rate" value="${value}" required aria-label="${value} out of 5" />
          <svg width="24" height="24" aria-hidden="true">
            <use href="${spriteHref('icon-star-modal')}"></use>
          </svg>
        </label>
      `
    )
    .join('');

  return `
    <form class="rating-form" novalidate>
      <h2 class="rating-form-title" id="exercise-modal-title">Give a rating</h2>
      <fieldset class="rating-scale">
        <legend>Your rating</legend>
        ${stars}
      </fieldset>
      <label class="rating-field">
        <span>Review</span>
        <textarea name="review" required placeholder="How was this exercise?"></textarea>
      </label>
      <label class="rating-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          required
          pattern="${EMAIL_PATTERN.source}"
          placeholder="example@mail.com"
          autocomplete="email"
        />
      </label>
      <p class="rating-form-error" data-rating-error role="alert"></p>
      <button class="rating-send" type="submit">Send</button>
    </form>
  `;
}

function onFavoriteClick(event) {
  const button = event.target.closest('[data-favorite-toggle]');

  if (!button || !currentExercise) {
    return;
  }

  const added = toggleFavorite(currentExercise);
  button.classList.toggle('is-favorite', added);
  button.setAttribute('aria-pressed', String(added));
  button.querySelector('[data-favorite-label]').textContent = added
    ? 'Remove from favorites'
    : 'Add to favorites';
  button
    .querySelector('[data-heart-icon]')
    ?.setAttribute('href', spriteHref('icon-heart'));
}

function renderStatus(text) {
  refs.content.innerHTML = `<p class="exercise-modal-status" id="exercise-modal-title">${escapeHtml(text)}</p>`;
}

function renderExercise(exercise) {
  const favorite = isFavorite(exercise._id);
  const gifUrl = safeUrl(exercise.gifUrl);
  const minutes = Number(exercise.time) || 3;

  refs.content.innerHTML = `
    <div class="exercise-modal-layout">
      ${
        gifUrl
          ? `<img class="exercise-modal-gif" src="${gifUrl}" alt="${escapeHtml(exercise.name)}" />`
          : ''
      }
      <div class="exercise-modal-info">
        <h2 class="exercise-modal-title" id="exercise-modal-title">${escapeHtml(exercise.name)}</h2>
        <div class="exercise-modal-rating">
          <span>${formatRating(exercise.rating)}</span>
          ${renderStars(exercise.rating)}
        </div>
        <ul class="exercise-modal-stats">
          ${statItem('Target', exercise.target)}
          ${statItem('Body Part', exercise.bodyPart)}
          ${statItem('Equipment', exercise.equipment)}
          ${statItem('Popular', exercise.popularity)}
          ${statItem('Burned calories', `${Number(exercise.burnedCalories) || 0} / ${minutes} min`)}
        </ul>
        <p class="exercise-modal-description">${escapeHtml(exercise.description)}</p>
        <div class="exercise-actions">
          <button
            class="exercise-favorite${favorite ? ' is-favorite' : ''}"
            type="button"
            data-favorite-toggle
            aria-pressed="${favorite}"
          >
            <span data-favorite-label>${
              favorite ? 'Remove from favorites' : 'Add to favorites'
            }</span>
            ${heartSvg(favorite)}
          </button>
          <button class="exercise-rate" type="button" data-open-rating>
            Give a rating
          </button>
        </div>
      </div>
    </div>
  `;
}

function statItem(label, value) {
  return `
    <li>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </li>
  `;
}

function renderStars(rating) {
  const value = Number(rating) || 0;
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = Math.min(Math.max(value - index, 0), 1);
    return `
      <span class="modal-star" style="--fill: ${fill}">
        <svg width="18" height="18" aria-hidden="true">
          <use href="${spriteHref('icon-star')}"></use>
        </svg>
        <svg class="modal-star-fill" width="18" height="18" aria-hidden="true">
          <use href="${spriteHref('icon-star')}"></use>
        </svg>
      </span>
    `;
  }).join('');

  return `<span class="modal-stars" aria-label="Rating ${formatRating(value)} out of 5">${stars}</span>`;
}

function formatRating(rating) {
  const value = Number(rating);
  return Number.isFinite(value) ? value.toFixed(1) : '0.0';
}

function safeUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    return '';
  }

  return '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function heartSvg() {
  return `
    <svg width="18" height="18" aria-hidden="true">
      <use data-heart-icon href="${spriteHref('icon-heart')}"></use>
    </svg>
  `;
}
