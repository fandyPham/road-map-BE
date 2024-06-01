import express from "express";
import dashboardRoutes from "./routes/dashboard-route";
import webAppRoutes from "./routes/web-route";
import cors from "cors";
const PORT = process.env.PORT || 4000;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the origin(s) you want to allow
  credentials: true, // Allow cookies to be included in CORS requests
  optionsSuccessStatus: 200, // For legacy browsers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/web-app", webAppRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
