import { TClient } from '../types/client';

const idToDateMapping = {
  1: new Date(),
  2: new Date(2026, 2, 1),
  3: new Date(2026, 2, 10),
  4: new Date(2026, 2, 17),
  5: new Date(2026, 2, 12),
  6: new Date(2026, 1, 1),
  7: new Date(2025, 2, 1),
  8: new Date(2025, 11, 1),
  9: new Date(2026, 2, 1),
  10: new Date(2026, 2, 1),
};

const appendDateToExistingUser = (user: TClient) => {
  if (!idToDateMapping[user?.id]) return user;
  const date = idToDateMapping[user.id] || new Date(2026, 2, 1);
  return { ...user, creation_date: date };
};

const appendDateToExistingUsers = (users: TClient[]) =>
  users.map((user) => appendDateToExistingUser(user));

export { appendDateToExistingUser, appendDateToExistingUsers };
