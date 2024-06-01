import express from "express";

import { googleAuth } from "../../domain/useAuthDomain";

const router = express.Router();

router.post("/google-login", googleAuth);

export default router;
