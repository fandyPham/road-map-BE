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
exports.createBlogComment = exports.getBlogComments = exports.getBlogDetail = exports.getBlogs = void 0;
const blog_1 = require("../data-access/blog");
const comment_1 = require("../data-access/comment");
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const blogs = yield (0, blog_1.blogsList)(query);
    res.json(blogs);
});
exports.getBlogs = getBlogs;
const getBlogDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = yield (0, blog_1.blogDetail)(+id || 0);
    res.json(blog);
});
exports.getBlogDetail = getBlogDetail;
const getBlogComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = req.query;
    const limit = +(query.limit || 10);
    const skip = +(query.page || 0);
    const blog = yield (0, comment_1.blogComments)(+id || 0, limit, skip);
    res.json(blog);
});
exports.getBlogComments = getBlogComments;
const createBlogComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const { comment } = req.body;
    const blog = yield (0, comment_1.addComment)(id, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, comment);
    res.json(blog);
});
exports.createBlogComment = createBlogComment;
