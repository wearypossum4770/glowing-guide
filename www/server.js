"use strict";
import optimus from "connect-image-optimus";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import admin from "sriracha";
import exerciseRouter from "./routers/exercises.js";
import blogPostRouter from "./routers/posts.js";
import userRouter from "./routers/users.js";
let command = "sudo service mongodb start";
var staticPath = path.dirname(".") + "/static/";
const PORT = process.env.PORT || 3003;
const URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/glowingGuide";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
console.log(connection.readyState); //logs 0
connection.on("connecting", () => {
  console.log(`MongoDB status is connecting: ${connection.readyState}`);
  console.log(connection.readyState); //logs 2
});
connection.on("connected", () => {
  console.log(`MongoDB status is connected: ${connection.readyState}`);
  console.log(connection.readyState); //logs 1
});
connection.on("disconnecting", () => {
  console.log(`MongoDB status is disconnecting: ${connection.readyState}`);
  console.log(connection.readyState); // logs 3
});
connection.on("disconnected", () => {
  console.log(`MongoDB status is disconnected: ${connection.readyState}`);
  console.log(connection.readyState); //logs 0
});
const app = express();
app.locals.title = "My App";
app.locals.email = "me@myapp.com";
app.use(cors());
app.use(optimus(staticPath));
app.use(express.static("files"));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(express.json({ limit: "1mb", extended: true }));
app.get("/", (req, res) => {
  res.json({ ping: true }, "Hello World!");
});
app.use(
  "/admin",
  admin({
    hideFields: [
      "_id",
      "_v",
      "__v",
      "alive",
      "is_active",
      "is_staff",
      "last_login",
      "is_superuser",
      "owasp_safe_password",
      "password",
    ],
  })
);
app.use("/exercise", exerciseRouter);
app.use("/users", userRouter);
app.use("/blog", blogPostRouter);
const server = app.listen(PORT, () =>
  console.log(`EXPRESS Server is running on port:${PORT}`)
);
setInterval(
  () =>
    server.getConnections((err, connections) =>
      console.log(`${connections} connections currently open`)
    ),
  100000
);
process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
function shutDown() {
  console.log("\nReceived kill signal, shutting down gracefully");
  console.log(`\nClosing app on port: ${PORT}`);
  server.close(() => {
    console.log("\nClosed out remaining connections");
    console.log("\nHTTP server closed");
    process.exit(0);
  });
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
  server.getConnections((err, connections) => {
    connections.forEach((curr) => curr.end());
    setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
  });
}
