import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

// Attach auth token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ───────────────────────────────────────────────
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

// ─── Books ──────────────────────────────────────────────
export const booksApi = {
  list: (params = {}) => api.get('/books', { params }),
  featured: () => api.get('/books/featured'),
  show: (slug) => api.get(`/books/${slug}`),
  search: (q) => api.get('/books/search', { params: { q } }),
};

// ─── Episodes ───────────────────────────────────────────
export const episodesApi = {
  list: (bookSlug) => api.get(`/books/${bookSlug}/episodes`),
  show: (bookSlug, episodeNumber) =>
    api.get(`/books/${bookSlug}/episodes/${episodeNumber}`),
};

// ─── Reading Progress ───────────────────────────────────
export const progressApi = {
  get: (bookSlug) => api.get(`/progress/${bookSlug}`),
  save: (bookSlug, data) => api.post(`/progress/${bookSlug}`, data),
  // data: { episode_number, scroll_position, completed }
};

// ─── User Library ───────────────────────────────────────
export const libraryApi = {
  list: () => api.get('/library'),
  add: (bookSlug) => api.post(`/library/${bookSlug}`),
  remove: (bookSlug) => api.delete(`/library/${bookSlug}`),
};

// ─── User ───────────────────────────────────────────────
export const userApi = {
  profile: () => api.get('/user/profile'),
  update: (data) => api.patch('/user/profile', data),
};

export default api;
