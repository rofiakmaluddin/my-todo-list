import { todos } from '~/server/models/todo';

export default defineEventHandler(async (event) => {
  const { activities_no, status } = await readBody(event);
  const todo = todos.find((todo) => todo.activities_no === activities_no);

  if (todo) {
    todo.status = status;
    return { success: true };
  }

  return { error: 'To-Do item not found' };
});
