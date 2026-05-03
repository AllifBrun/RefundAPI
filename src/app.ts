import express from "express";
import "express-async-errors";
import cors from "cors";

import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";
import uploadConfig from "@/configs/upload";
import "dotenv/config";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://refund-354e.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandling);

export { app };
