import './js/header.js';

import spriteUrl from './images/sprite.svg';
window.__SPRITE_URL__ = spriteUrl;

import './js/filters.js';
import './js/categories.js';
import './js/exercises.js';
import './js/quote.js';
import { initSubscriptionForm } from './js/subscription.js';
import './js/navigation.js';
import { initExerciseModal } from './js/exercise-modal.js';
import './js/scroll-top.js';
initExerciseModal();
initSubscriptionForm();
