import { todos } from '~/server/models/todo';

export default defineEventHandler((event) => {
  const userId = getQuery(event).userId as string;
  return todos.filter((todo) => todo.userId === userId);
});
