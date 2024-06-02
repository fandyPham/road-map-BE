"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useUserDomain_1 = require("../../domain/useUserDomain");
const middleware_1 = require("../../utils/middleware");
const router = express_1.default.Router();
router.get("/", useUserDomain_1.getAllUsers);
router.post("/create", middleware_1.authInterceptor, useUserDomain_1.createUser);
exports.default = router;
