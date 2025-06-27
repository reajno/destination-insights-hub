import { Router } from "express";
import admin from "./routes/admin.js";
import data from "./routes/data.js";

const api = Router();

api.use("/admin", admin); // /api/admin routes
api.use("/data", data); // /api/data routes

export default api;
