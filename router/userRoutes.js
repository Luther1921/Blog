const express = require("express");
const {
  loginUser,
  registerUser,
  test,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/test", test);

module.exports = router;
