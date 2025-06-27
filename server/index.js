import express from "express";
import cors from "cors";
import apiRouter from "./apiRouter.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
