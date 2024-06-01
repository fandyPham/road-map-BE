import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: any,
  res: {
    json: (
      arg0: {
        id: number;
        role_id: number | null;
        username: string | null;
        email: string | null;
        created_at: Date;
      }[]
    ) => void;
  }
) => {
  const users = await prisma.users.findMany();
  res.json(users);
};

export const createUser = async (
  req: { body: any },
  res: {
    json: (arg0: {
      id: number;
      role_id: number | null;
      username: string | null;
      email: string | null;
      created_at: Date;
    }) => void;
  }
) => {
  const newUser = await prisma.users.create({
    data: req.body,
  });
  res.json(newUser);
};

// Add other controller functions for updating, deleting, etc.
