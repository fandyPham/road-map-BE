"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useBlogDomain_1 = require("../../domain/useBlogDomain");
const middleware_1 = require("../../utils/middleware");
const router = express_1.default.Router();
router.get("/", useBlogDomain_1.getBlogs);
router.get("/:id/detail", useBlogDomain_1.getBlogDetail);
router.get("/:id/comments", useBlogDomain_1.getBlogComments);
router.post("/:id/comment", middleware_1.authInterceptor, useBlogDomain_1.createBlogComment);
exports.default = router;
