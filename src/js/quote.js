import { spriteHref } from './sprite.js';
import quoteDesktopUrl from '../images/women-sportswear-taking-break-from-workout_1.jpg';
import quoteDesktop2xUrl from '../images/women-sportswear-taking-break-from-workout@2x.jpg';
import quoteTabletUrl from '../images/women-sportswear-taking-break-from-workout-1_tab.jpg';
import quoteTablet2xUrl from '../images/women-sportswear-taking-break-from-workout-1_tab@2x.jpg';
import quoteMobileUrl from '../images/women-sportswear-taking-break-from-workout-1_mob.jpg';
import quoteMobile2xUrl from '../images/women-sportswear-taking-break-from-workout_1_mob@2x.jpg';
import { getQuote } from './api.js';
import { LS_KEYS } from './constants.js';
import { hideLoader, showLoader } from './loader.js';

function getTodayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function getCachedQuote() {
  try {
    const saved = localStorage.getItem(LS_KEYS.QUOTE);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (parsed?.date === getTodayString() && parsed.quote) return parsed;
  } catch {
    return null;
  }

  return null;
}

function saveQuoteToCache(data) {
  localStorage.setItem(
    LS_KEYS.QUOTE,
    JSON.stringify({ ...data, date: getTodayString() })
  );
}

function populateSidebarWrapper() {
  const wrapper = document.querySelector('.quote-wrapper');
  if (!wrapper || wrapper.innerHTML.trim()) return;

  wrapper.innerHTML = `
    <div class="quote-card">
      <div class="quote-card-top">
        <div class="quote-card-icon-wrap">
          <svg width="32" height="32" aria-hidden="true"><use href="${spriteHref('icon-quote-run')}"></use></svg>
        </div>
        <p class="quote-card-title">Quote of the day</p>
        <svg class="quote-mark" width="24" height="24" aria-hidden="true"><use href="${spriteHref('icon-quote')}"></use></svg>
      </div>
      <blockquote class="quote-text"></blockquote>
      <p class="quote-author"></p>
    </div>
    <div class="quote-photo-wrap">
      <picture>
        <source
          media="(min-width: 1280px)"
          srcset="${quoteDesktopUrl} 1x, ${quoteDesktop2xUrl} 2x"
        />
        <source
          media="(min-width: 768px)"
          srcset="${quoteTabletUrl} 1x, ${quoteTablet2xUrl} 2x"
        />
        <img
          src="${quoteMobileUrl}"
          srcset="${quoteMobileUrl} 1x, ${quoteMobile2xUrl} 2x"
          alt="Women working out"
          class="quote-photo"
          width="290"
          height="242"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
      </picture>
    </div>
    <div class="daily-norm-card">
      <div class="daily-norm-header">
        <div class="daily-norm-icon-wrap">
          <svg width="20" height="20" aria-hidden="true"><use href="${spriteHref('icon-dumbbell')}"></use></svg>
        </div>
        <div>
          <p class="daily-norm-time">110 min</p>
          <p class="daily-norm-subtitle">Daily norm of sports</p>
        </div>
      </div>
      <p class="daily-norm-text">The World Health Organization recommends at least 150 minutes of moderate-intensity aerobic physical activity throughout the week for adults aged 18-64. However, what happens if we adjust that number to 110 minutes every day? While it might seem like a high number to hit, dedicating 110 minutes daily to sporting activities may offer unparalleled benefits to physical health, mental well-being, and overall quality of life.</p>
    </div>
  `;
}

function renderQuote({ quote, author }) {
  document.querySelectorAll('.quote-text').forEach(el => {
    el.textContent = quote;
  });
  document.querySelectorAll('.quote-author').forEach(el => {
    el.textContent = author;
  });
}

function setupTextAdjustment() {
  const textEl = document.querySelector('.daily-norm-text');

  if (!textEl) {
    setTimeout(setupTextAdjustment, 100);
    return;
  }

  if (!textEl.dataset.originalText) {
    textEl.dataset.originalText = textEl.textContent.trim();
  }

  const original = textEl.dataset.originalText;

  function adjustText() {
    const w = window.innerWidth;
    const maxLen = w < 768 ? 169 : w < 1280 ? 179 : original.length;
    textEl.textContent =
      original.length > maxLen
        ? original.substring(0, maxLen).trim() + '...'
        : original;
  }

  adjustText();
  window.addEventListener('resize', adjustText);
}

export async function initQuoteSection() {
  try {
    let data = getCachedQuote();
    if (!data) {
      showLoader();
      try {
        data = await getQuote();
        saveQuoteToCache(data);
      } finally {
        hideLoader();
      }
    }
    populateSidebarWrapper();
    renderQuote(data);
    setupTextAdjustment();
  } catch {
    return;
  }
}

initQuoteSection();
