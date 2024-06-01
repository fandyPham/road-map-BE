import express from "express";
import userRoutes from "./userRoutes";
import blogRoutes from "./blogRoutes";
import authRoutes from "./authRoutes";

const router = express.Router();
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth", authRoutes);
export default router;
