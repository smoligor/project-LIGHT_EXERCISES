export const FAVORITES_STORAGE_KEY = 'energy-favorites';
export const FAVORITES_CHANGED_EVENT = 'favorites:changed';

export const LS_KEYS = {
  FAVORITES: FAVORITES_STORAGE_KEY,
  QUOTE: 'yourenergy:quote',
  QUOTE_DATE: 'yourenergy:quote-date',
};

export const FILTERS = {
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
};

export const EVENTS = {
  FILTER_CHANGED: 'yourenergy:filter-changed',
  CATEGORY_SELECTED: 'yourenergy:category-selected',
  SEARCH_SUBMITTED: 'yourenergy:search-submitted',
  EXERCISE_OPEN: 'exercise:open',
  FAVORITES_CHANGED: FAVORITES_CHANGED_EVENT,
};

export const EXERCISE_MODAL = {
  API_URL: 'https://your-energy.b.goit.study/api/exercises/',
  FAVORITES_KEY: FAVORITES_STORAGE_KEY,
  FAVORITES_CHANGED_EVENT,
};

export const PAGINATION = {
  CATEGORIES_DESKTOP: 12,
  CATEGORIES_MOBILE: 9,
  EXERCISES_DESKTOP: 10,
  EXERCISES_MOBILE: 8,
};

export const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
