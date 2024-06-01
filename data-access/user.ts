import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserViaEmail = async (email: string) => {
  const response = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return response;
};

export const updateUser = async (
  email: string,
  avatar?: string,
  firstName?: string,
  lastName?: string
) => {
  const response = await prisma.users.update({
    where: {
      email,
    },
    data: {
      avatar,
      first_name: firstName,
      last_name: lastName,
    },
  });

  return response;
};

export const createUser = async (
  email: string,
  avatar?: string,
  firstName?: string,
  lastName?: string
) => {
  const response = await prisma.users.create({
    data: {
      email,
      avatar,
      first_name: firstName,
      last_name: lastName,
    },
  });

  return response;
};
