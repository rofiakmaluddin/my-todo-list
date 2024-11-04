import { todos } from '~/server/models/todo';

export default defineEventHandler(async (event) => {
  const { activities_no, subject, description } = await readBody(event);
  const todo = todos.find(
    (todo) => todo.activities_no === activities_no && todo.status === 'Unmarked'
  );

  if (todo) {
    todo.subject = subject;
    todo.description = description;
    return { success: true };
  }

  return { error: 'Cannot modify a marked To-Do item' };
});
