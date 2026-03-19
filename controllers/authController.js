const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken");
const sendVerificationEmail = require("../services/emailService");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = generateToken();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    });

    await sendVerificationEmail(email, token);

    res.status(201).json({
      message: "User registered. Please verify email.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    if (user.verificationTokenExpiry < Date.now()) {
      return res.status(400).json({
        message: "Token expired",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;

    await user.save();

    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before login",
      });
    }

    res.json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
