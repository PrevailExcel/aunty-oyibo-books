import { ref, computed } from 'vue';
import { authApi } from '../api/index.js';

const token = ref(localStorage.getItem('token'));
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value);

  const login = async (email, password) => {
    const { data } = await authApi.login(email, password);
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = async () => {
    try { await authApi.logout(); } catch {}
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return { isLoggedIn, user, token, login, logout };
}
