import axios from 'axios';
import type { IAuthPayload } from '~/types/auth';

export function register(payload: IAuthPayload) {
  return axios.post('/api/auth/register', payload);
}

export function login(payload: IAuthPayload) {
  return axios.post('/api/auth/login', payload);
}
