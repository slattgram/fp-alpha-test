export const compareIds = (id1: number | string, id2: number | string): boolean =>
  Number(id1) === Number(id2);

export const findById = <T extends { id: number | string }>(
  items: T[],
  id: number | string,
): T | undefined => items.find((item) => compareIds(item.id, id));

export const filterById = <T extends { id: number | string }>(
  items: T[],
  id: number | string,
): T[] => items.filter((item) => compareIds(item.id, id));

export const filterByUserId = <T extends { userId: number | string }>(
  items: T[],
  userId: number | string,
): T[] => items.filter((item) => compareIds(item.userId, userId));
