"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard-route"));
const web_route_1 = __importDefault(require("./routes/web-route"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000", // Replace with the origin(s) you want to allow
    credentials: true, // Allow cookies to be included in CORS requests
    optionsSuccessStatus: 200, // For legacy browsers
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(express_1.default.json());
app.use("/api/dashboard", dashboard_route_1.default);
app.use("/api/web-app", web_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
