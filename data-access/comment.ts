import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const blogComments = async (
  blogId: number,
  limit: number,
  skip: number
) => {
  const response: any = await prisma.$queryRaw`
  select 
    bc.*, 
    Case 
      when users.last_name is null then users.first_name 
      else CONCAT(users.first_name, ' ', users.last_name) 
      end as author 
    from blog_comments bc 
    join users on bc.created_by = users.id 
    where blog_id = ${blogId} order by bc.created_at DESC limit ${limit} offset ${
    limit * skip
  };`;

  return response;
};

export const addComment = async (
  blogId: number,
  userId: number,
  comment: string
) => {
  const response: any = await prisma.blog_comments.create({
    data: {
      created_at: new Date(),
      created_by: userId,
      blog_id: blogId,
      content: comment,
    },
  });

  return response;
};
