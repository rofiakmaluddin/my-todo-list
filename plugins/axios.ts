import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://api.example.com',
  });
  nuxtApp.provide('axios', instance);
});
