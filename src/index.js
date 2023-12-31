const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
})
const port = process.env.PORT || 8000;
const db = require("./models");

const express = require("express");
const app = express();

// const { home } = require("./");
const { authRoutes } = require("./routes");
const { blogRoutes } = require("./routes");

app.use(express.json());

// app.use("/branch-management", authRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/auth/forgotPass", authRoutes);              // [PUT] Forgot Password
// app.use("/api/auth/resetPass", authRoutes);
// app.use("/api/auth/changeUsername", authRoutes);
// app.use("/api/auth/changeEmail", authRoutes);
// app.use("/api/profile/single-uploaded", authRoutes);
app.use("/api/blog/", blogRoutes);                        // 
// app.use("/api/blog/remove/:id", authRoutes);
// app.use("/api/blog?id_cat=3&sort=ASC&page898", authRoutes);
// app.use("/api/blog/allCategory", authRoutes);
// app.use("/api/blog/log", authRoutes);
// app.use("/api/blog/like", authRoutes);
// app.use("/api/blog/pagLike", authRoutes);
// app.use("/api/blog /pagFav", authRoutes);
// app.use("/api/blog/pagFav", authRoutes);
// app.use("/Public/Blog-1683581987195226008.png", authRoutes);
// app.use("/Public/Avatar-6.png", authRoutes);

//this comment added for requirement of git changes tracker file

app.listen(port, function () {
  console.log(`server is running on localhost ${port}`)
})