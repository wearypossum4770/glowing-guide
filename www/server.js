import express from "express";
import cors from "cors";
import userRouter from "./routers/users.js";
import exerciseRouter from "./routers/exercises.js";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3003;
const URI = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "glowingGuide";
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.static("public"));
app.use(express.static("files"));
app.use("/exercise", exerciseRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
