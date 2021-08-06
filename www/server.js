"use strict";
import optimus from "connect-image-optimus";
import cors from "cors";
import express from "express";
import database from "./config/db.js";
import path from "path";
import admin from "sriracha";
import exerciseRouter from "./routers/exercises.js";
import blogPostRouter from "./routers/posts.js";
import userRouter from "./routers/users.js";
import { hideFields, locals, json_url_config } from "./config/extras.js";
let command = "sudo service mongodb start";
var staticPath = path.dirname(".") + "/static/";
const PORT = process.env.PORT || 3003;
const app = express(locals);
database();
app.use(cors());
app.use(optimus(staticPath));
app.use(express.static("files"));
app.use(express.urlencoded(json_url_config));
app.use(express.json(json_url_config));
app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.use("/admin", admin({ hideFields: hideFields }));
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
