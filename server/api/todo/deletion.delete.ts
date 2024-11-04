import { todos } from '~/server/models/todo';

export default defineEventHandler(async (event) => {
  const activities_no = getQuery(event).activities_no as string;
  const index = todos.findIndex(
    (todo) => todo.activities_no === activities_no && todo.status === 'Unmarked'
  );

  if (index !== -1) {
    todos.splice(index, 1);
    return { success: true };
  }

  return { error: 'Cannot delete a marked To-Do item' };
});
