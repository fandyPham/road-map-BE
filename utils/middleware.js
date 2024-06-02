"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInterceptor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authInterceptor = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const pathKey = req.path;
    // If no authorization header is present, return an error
    if (!authHeader) {
        return res.status(401).json({ error: "unauthorize" });
    }
    // Extract the token from the authorization header
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]) || "";
    // Verify the token
    if (authHeader) {
        const decodedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }
            // check permission
        });
        req.user = decodedUser;
    }
    next();
};
exports.authInterceptor = authInterceptor;
