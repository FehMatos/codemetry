import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import dailyStatRoutes from "./routes/dailyStatRoutes";
import heartbeatRoutes from "./routes/heartbeatRoutes";
import startDailyStatScheduler from "./scheduler/dailyStatScheduler";

dotenv.config();

const app = express();

const allowedOrigins: string[] = ["http://localhost:5173"];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });
}

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}
const PORT = process.env.PORT || 4000;

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/dailyStat", dailyStatRoutes);
app.use("/heartbeat", heartbeatRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(` ✅ Connected to DB & listening on port ${PORT}`);
      startDailyStatScheduler();
    });
  })
  .catch((error) => {
    console.log(error);
  });
