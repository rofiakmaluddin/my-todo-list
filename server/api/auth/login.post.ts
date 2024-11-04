import { users } from '~/server/models/user';

export default defineEventHandler(async (event) => {
  const { id, password } = await readBody(event);
  const user = users.find(
    (user) => user.id === id && user.password === password
  );

  if (!user) {
    return { error: 'Invalid credentials' };
  }

  return { success: true, userId: user.id, message: 'Login successful' };
});
