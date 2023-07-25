const express = require("express");
const app = express();
const connectDB = require("./config/db");
const blogRouter = require("./router/blogRoutes");
const userRouter = require("./router/userRoutes");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/blog", blogRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 30000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
