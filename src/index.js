const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
})
const port = process.env.PORT || 8000;
const db = require("./models");

const express = require("express");
const app = express();

const { branchRoutes } = require("./routes");
// const { home } = require("./");

app.use(express.json());

app.use("/branch-management", branchRoutes);
app.use("/api/auth", branchRoutes);                         // [POST] Register Account
app.use("/api/auth/verify", branchRoutes);                  // [PATCH] Verify Account
app.use("/api/auth/login", branchRoutes);                   // [POST] Login
                                                            // [GET] Keep Login
app.use("/api/auth/forgotPass", branchRoutes);              // [PUT] Forgot Password
app.use("/api/auth/resetPass", branchRoutes);
app.use("/api/auth/changeUsername", branchRoutes);
app.use("/api/auth/changeEmail", branchRoutes);
app.use("/api/profile/single-uploaded", branchRoutes);
app.use("/api/blog/remove/:id", branchRoutes);
app.use("/api/blog?id_cat=3&sort=ASC&page898", branchRoutes);
app.use("/api/blog/allCategory", branchRoutes);
app.use("/api/blog/log", branchRoutes);
app.use("/api/blog/like", branchRoutes);
app.use("/api/blog/pagLike", branchRoutes);
app.use("/api/blog/pagFav", branchRoutes);
app.use("/api/blog/pagFav", branchRoutes);
app.use("/Public/Blog-1683581987195226008.png", branchRoutes);
app.use("/Public/Avatar-6.png", branchRoutes);