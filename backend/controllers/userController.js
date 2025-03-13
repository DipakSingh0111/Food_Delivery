import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// =================================
// Login CONTROLLER
// =================================

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User does't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    // token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in Login User." });
  }
};
// http://localhost:8080/api/user/register

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// =================================
// Register CONTROLLER
// =================================

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // validation
    if (!name || !email || !password) {
      res.status(404).json({ success: false, message: "Provide All Fields" });
    }

    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      res.status(404).json({ success: false, message: "User Already exists" });
    }

    // validation email format & strong password
    if (!validator.isEmail(email)) {
      res
        .status(404)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // check password
    if (password.length < 8) {
      res
        .status(404)
        .json({ success: false, message: "Please enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "user Created Successfully.",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in Register user" });
  }
};

export { loginUser, registerUser };
