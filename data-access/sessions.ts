import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserViaEmail = async (payload: any) => {
  // const response = await prisma.session.create({
  //   data: {
  //     expired_at: "",
  //   },
  // });
  // return response;
};
