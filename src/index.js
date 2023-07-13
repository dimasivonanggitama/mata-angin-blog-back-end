const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
})
const port = process.env.PORT || 8000;
const express = require("express");
const db = require("./models");
const app = express();

const { branchRoutes } = require("./routes");

app.use(express.json());

app.use("/branch-management", branchRoutes);
// app.use("/branch-management", branchRoutes);