const express = require("express");
const {
  getBlog,
  addBlog,
  getBlogByID,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.use(validateToken);

//router

router.get("/", getBlog);
router.post("/", addBlog);
router.get("/:id", getBlogByID);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
