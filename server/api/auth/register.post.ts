import { users, User } from '~/server/models/user';

export default defineEventHandler(async (event) => {
  const { id, name, password } = await readBody(event);
  const userExists = users.some((user) => user.id === id);

  if (userExists) {
    return { error: 'User ID already exists' };
  }

  users.push({ id, name, password });
  return { success: true, message: 'User registered successfully' };
});
