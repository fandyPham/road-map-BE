"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogDetail = exports.blogsList = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const blogsList = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = +(params.limit || 10);
    const skip = +(params.page || 0);
    const response = yield prisma.$queryRaw `SELECT
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
});
exports.blogsList = blogsList;
const blogDetail = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$queryRaw `
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
    return (response === null || response === void 0 ? void 0 : response[0]) ? response === null || response === void 0 ? void 0 : response[0] : response;
});
exports.blogDetail = blogDetail;
