import express from "express";
import { getAllUsers, createUser } from "../../domain/useUserDomain";
import { authInterceptor } from "../../utils/middleware";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create", authInterceptor, createUser);

export default router;
