import { todos, generateActivityNo } from '~/server/models/todo';

export default defineEventHandler(async (event) => {
  const { userId, subject, description } = await readBody(event);
  const activityNo = generateActivityNo();

  todos.push({
    activities_no: activityNo,
    userId,
    subject,
    description,
    status: 'Unmarked',
  });

  return { success: true, activityNo };
});
