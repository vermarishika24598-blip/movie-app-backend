const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signin = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Token Generated");

    res.status(200).json({ token });

  } catch (error) {
    console.error("SIGNIN ERROR:", error);

    res.status(500).json({
      message: "Signin failed",
      error: error.message,
    });
  }
};

module.exports = {signin}; // ✅ MUST be this
