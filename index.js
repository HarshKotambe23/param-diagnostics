import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });

import authRoute from "./routes/authRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import adminRoute from "./routes/adminRoutes.js";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import helmet from "helmet";
import path from "path";
const __dirname = path.resolve()
import mongoose from "mongoose";
import {
  adminProtectedRoute,
  employeeProtectedRoute,
} from "./utils/protected.js";
mongoose.connect(process.env.MONGO_URL);

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10000,
  // standardHeaders: 'draft-7',
  // legacyHeaders: false,
})
// app.use(limiter)
// app.use(hpp())
// app.use(helmet.contentSecurityPolicy({
//   contentSecurityPolicy: false
// }))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("dist"))
app.use(express.static("uploads"))
app.use(express.static("qrUpload"))
app.use(
  cors({
    // origin: "http://localhost:5173",
    // origin: "https://param-diagnostics.onrender.com",
    origin: "https://paramdiagnostics.in",
    credentials: true,
  })
)



app.use("/api/auth", authRoute)
app.use("/api/admin", adminProtectedRoute, adminRoute)
app.use("/api/employee", employeeProtectedRoute, employeeRoute);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
  // res.status(404).json({ message: "resource not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "something went wrong" });
});

mongoose.connection.once("open", () => {
  console.log("MONGO SERVER RUNNING");
  app.listen(process.env.PORT, console.log(`http://localhost:${process.env.PORT}`));
});
