import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function getFilters({ filter, page = 1, limit = 12 }) {
  const { data } = await api.get('/filters', {
    params: { filter, page, limit },
  });
  return data;
}

export async function getExercises(params = {}) {
  const { page = 1, limit = 10, ...rest } = params;
  const { data } = await api.get('/exercises', {
    params: { ...rest, page, limit },
  });
  return data;
}

export async function getExerciseById(exerciseId) {
  const { data } = await api.get(`/exercises/${exerciseId}`);
  return data;
}

export async function addExerciseRating(exerciseId, payload) {
  const { data } = await api.patch(`/exercises/${exerciseId}/rating`, payload);
  return data;
}

export async function getQuote() {
  const { data } = await api.get('/quote');
  return data;
}

export async function subscribe(email) {
  const { data } = await api.post('/subscription', { email });
  return data;
}
