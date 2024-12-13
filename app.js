require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const expressSession = require("express-session");
const connectDB = require("./config/db");
const path = require("path");

connectDB(); //Database Connection

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Ejs Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const indexrouter = require("./routes/index");
app.use("/", indexrouter);

const ownerrouter = require("./routes/owner-route");
app.use("/owner", ownerrouter);

const studentrouter = require("./routes/student-route");
app.use("/student", studentrouter);

const teacherrouter = require("./routes/techers-route");
app.use("/teacher", teacherrouter);

// const classrouter = require("./routes/classes-route");
// app.use("/class", classrouter);

const port = process.env.PORT || 3000;
app.listen(port);
