import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
const Sequelize = require("sequelize");
import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";
import userRouter from "./routes/users";
import registerRouter from "./routes/auth/register";
import loginRouter from "./routes/auth/login";
const config = require("./config/config");
var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/users", userRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Require the DATABASE (Sequelize)
const db = require("./config/database");

// Cnonnect
db.authenticate()
  .then(() => {
    console.log("Connection to ☕ database is succesful!");
  })
  .catch(err => {
    console.error("Unable to connect to ☕ database", err);
  });

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
