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
exports.addComment = exports.blogComments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const blogComments = (blogId, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$queryRaw `
  select 
    bc.*, 
    Case 
      when users.last_name is null then users.first_name 
      else CONCAT(users.first_name, ' ', users.last_name) 
      end as author 
    from blog_comments bc 
    join users on bc.created_by = users.id 
    where blog_id = ${blogId} order by bc.created_at DESC limit ${limit} offset ${limit * skip};`;
    return response;
});
exports.blogComments = blogComments;
const addComment = (blogId, userId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.blog_comments.create({
        data: {
            created_at: new Date(),
            created_by: userId,
            blog_id: blogId,
            content: comment,
        },
    });
    return response;
});
exports.addComment = addComment;
