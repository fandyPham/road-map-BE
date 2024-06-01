import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const blogsList = async (params: any) => {
  const limit = +(params.limit || 10);
  const skip = +(params.page || 0);

  const response: any = await prisma.$queryRaw`SELECT
    b.*,
    u.first_name,
    u.last_name,
    u.avatar,
    u.username,
    jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title)) as tags
  FROM
    blogs b
  JOIN
    users u ON b.created_by = u.id
  JOIN
    blog_tags bt ON b.id = bt.blog_id
  JOIN
    tag t ON bt.tag_id = t.id
  GROUP BY
    b.id, u.id order by created_at DESC limit ${limit} offset ${limit * skip};
      `;

  // const response = await prisma.blogs.findMany({
  //   include: {
  //     blog_tags: {
  //       select: {
  //         tag: {
  //           select: {
  //             id: true,
  //             title: true,
  //           },
  //         },
  //       },
  //     },
  //     user: {
  //       select: {
  //         first_name: true,
  //         last_name: true,
  //       },
  //     },
  //   },
  //   skip: skip,
  //   take: limit,
  // });

  return response;
};

export const blogDetail = async (blogId: number) => {
  const response: any = await prisma.$queryRaw`
    select 
      blogs.*,
      users.first_name,
      users.last_name,
      (
        select jsonb_agg(jsonb_build_object('id', tag.id, 'title', tag.title))
        from tag
        join blog_tags on blog_tags.tag_id = tag.id
        where blog_tags.blog_id = blogs.id
      ) as tags
    from blogs
    join users on users.id = blogs.created_by
    where blogs.id = ${blogId}`;

  return response?.[0] ? response?.[0] : response;
};
