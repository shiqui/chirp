import { db } from "..";

export const getUserById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, id),
  });
  return user;
};
