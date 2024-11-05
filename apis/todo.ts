import axios from 'axios';
import type { IMarkPayload, ITodo, ITodoPayload } from '~/types/todo';

export function create(payload: ITodoPayload) {
  return axios.post('/api/todo/create', payload);
}

export function modify(payload: ITodoPayload) {
  return axios.put('/api/todo/modify', payload);
}

export function mark(payload: IMarkPayload) {
  return axios.patch('/api/todo/mark', payload);
}

export function get() {
  return axios.get<ITodo[]>('/api/todo/list');
}

export function remove(activities_no: string) {
  return axios.delete(`/api/todo/deletion?activities_no=${activities_no}`);
}
