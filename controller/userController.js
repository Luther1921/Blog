const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// creating a register user endpoint
// check if user already exists in the database
// hash password and save user to the database

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!email || !username || !password)
      res.status(400).json({ error: "all fields are mandatory" });
    const availableUser = await User.findOne({ email });
    if (availableUser) res.status(400).json({ error: "user already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    if (!user) res.status(400).json({ error: "error while creating user" });
    res.status(200).json({
      message: "user created successfully",
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// creating a login endpoint
//check if user exists in the database
// compare password with hashed password
// generate token

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).json({ error: "all fields are mandatory" });
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ error: "User not found" });
    if (user && bcrypt.compare(password, user.password)) {
      const accessToken = await JWT.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken, username: user.username });
    } else {
      res.status(400).json({ error: "email or password is invalid" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// creating a update table endpoint for database
const test = async (req, res) => {
  try {
    const update = await User.updateMany({}, { $set: { token: "" } });
    console.log(update);
    if (!update) {
      return res.status(400).json({ error: "Error occured !" });
    }

    return res.status(200).json({ message: "successful!" });
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

module.exports = { loginUser, registerUser, test };
