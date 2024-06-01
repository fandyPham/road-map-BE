import { PrismaClient } from "@prisma/client";
import { blogDetail, blogsList } from "../data-access/blog";
import { Request, Response } from "express";
import { addComment, blogComments } from "../data-access/comment";

export const getBlogs = async (req: Request, res: Response) => {
  const query = req.query;
  const blogs = await blogsList(query);
  res.json(blogs);
};

export const getBlogDetail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blog = await blogDetail(+id || 0);
  res.json(blog);
};

export const getBlogComments = async (req: Request, res: Response) => {
  const id = req.params.id;
  const query = req.query;
  const limit = +(query.limit || 10);
  const skip = +(query.page || 0);

  const blog = await blogComments(+id || 0, limit, skip);
  res.json(blog);
};

export const createBlogComment = async (req: any, res: Response) => {
  const id = req.params.id;
  const { comment } = req.body;

  const blog = await addComment(id, req.user?.id, comment);
  res.json(blog);
};
