import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";

// SocketIo Init
import handleSocket from "./socket";
const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
handleSocket(io);

const NODE_ENV = process.env.NODE_ENV! || "development";
const PORT = process.env.PORT! || 3100;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
import { authMiddleware } from "./src/middleware";

// authentication middleware
app.use("*", authMiddleware);

import autoroutes from 'express-automatic-routes';
autoroutes(app, {
  dir: path.join(__dirname, "src/routes"),
  log: NODE_ENV != "production",
});

try {
  server.listen(PORT, (): void => {
    console.log(`Connected on ${NODE_ENV} environment on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
