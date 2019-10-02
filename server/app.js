import regeneratorRuntime from "regenerator-runtime";
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";
import testRouter from "./routes/test";
import authRouter from "./routes/api/auth";
import userRouter from "./routes/api/users";
import projectRouter from "./routes/api/projects";
import relationshipRouter from "./routes/api/relationships";
import discoveryRouter from "./routes/api/discovery";

// import awsRouter from "./routes/api/awsController";

var app = express();
var bodyParser = require("body-parser");

// cors
app.use(cors());

// app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.json({ limit: '10mb' }))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/relationships", relationshipRouter);
app.use("/api/discovery", discoveryRouter);
app.use("/test", testRouter);
// app.use("/sign_s3", awsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get("/endpoint", function(req, res, next) {
  res.json({ msg: "💖 This is CORS-enabled for all origins!" });
});

// Passport Middleware
require("./config/passport");

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
