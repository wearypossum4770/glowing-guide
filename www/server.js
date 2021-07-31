import express from "express";
import cors from "cors";
import path from "path";
import userRouter from "./routers/users.js";
import exerciseRouter from "./routers/exercises.js";
import blogPostRouter from "./routers/posts.js";
import optimus from "connect-image-optimus";
import session from "express-session";
import admin from "sriracha";
import mongoose from "mongoose";
let command = "sudo service mongodb start";
var staticPath = path.dirname(".") + "/static/";
const PORT = process.env.PORT || 3003;
const URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/glowingGuide";
const app = express();
app.locals.title = "My App";
app.locals.email = "me@myapp.com";
app.use(cors());
app.use(optimus(staticPath));
app.use(express.static("files"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/admin", admin());
app.use("/exercise", exerciseRouter);
app.use("/users", userRouter);
app.use("/blog", blogPostRouter);
const server = app.listen(PORT, () =>
  console.log(`Server is running on port:${PORT}`)
);

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
