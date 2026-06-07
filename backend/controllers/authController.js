const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// ================= REGISTER =================

const createAccount = async (req, res) => {
  try {

    const { email, username, password } = req.body;

    // Vérifier si email existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already taken",
      });
    }

    // Hasher password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création user simple
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      role: "user", // toujours user
    });

    // Générer token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ================= LOGIN =================

const loginAccount = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Vérifier utilisateur
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Account doesn't exist",
      });
    }

    // Vérifier password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {

      return res.status(401).json({
        message: "Incorrect password",
      });

    }

    // Générer token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },

      token,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createAccount,
  loginAccount,
};