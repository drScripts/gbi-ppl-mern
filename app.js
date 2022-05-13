const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { superAdminMiddleware, authMiddleware } = require("./middleware");

const usersRouter = require("./routes/users");
const cabangRouter = require("./routes/cabangs");
const pembimbingRouter = require("./routes/pembimbing");
const kelasRouter = require("./routes/kelas");
const userPermissionRouter = require("./routes/user-permission");
const childrenRouter = require("./routes/children");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/cabangs", cabangRouter);

app.use(authMiddleware);
app.use("/pembimbings", pembimbingRouter);
app.use("/kelas", kelasRouter);
app.use("/childrens", childrenRouter);
app.use(superAdminMiddleware);
app.use("/user-permissions", userPermissionRouter);

module.exports = app;
