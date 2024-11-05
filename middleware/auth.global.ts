import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/auth/login', '/auth/register'];

  if (publicRoutes.includes(to.path)) return;

  if (import.meta.client) {
    const userSession = localStorage.getItem('user_session');

    if (!userSession) {
      return navigateTo('/auth/login');
    } else return;
  }
});
