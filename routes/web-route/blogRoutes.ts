import express from "express";
import {
  getBlogComments,
  getBlogDetail,
  getBlogs,
  createBlogComment,
} from "../../domain/useBlogDomain";
import { authInterceptor } from "../../utils/middleware";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id/detail", getBlogDetail);
router.get("/:id/comments", getBlogComments);
router.post("/:id/comment", authInterceptor, createBlogComment);

export default router;
