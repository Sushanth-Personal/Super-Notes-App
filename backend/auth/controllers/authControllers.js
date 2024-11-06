const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtExpiresIn = "15m";
const jwtRefreshExpiresIn = "20m";
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: jwtExpiresIn,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: jwtRefreshExpiresIn,
  });
};

const signUpUser = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    // Check if username already exists
    const existingUserName = await User.exists({ userName });

    if (existingUserName) {
      return res
        .status(400)
        .json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.exists({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists" });
    }

    // Create new user if no existing user or email found
    const user = new User({ userName, password, email });

    // Save the user to the database
    await user.save();

    // Generate JWT (you would need a function to do this)
    const accessToken = generateAccessToken(user); // This should be a function to generate the token
    const refreshToken = generateRefreshToken(user); // This should be a function to generate the token

    // Send response with tokens
    res
      .status(200)
      .json({ message: "Success", user, accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: "Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.login(identifier, password);

    if (user) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Directly update the user document with the refreshToken
      await User.updateOne(
        { _id: user._id },
        { $set: { refreshToken: refreshToken } }
      );

      res.status(200).json({
        message: "Success",
        userId: user._id, // Optionally include only selective user info here if needed
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkRefreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    // Verify refresh token
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.sendStatus(403); // Forbidden
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    return res.sendStatus(403); // Forbidden
  }
};

const checkAccessToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Authorization: Bearer <token>'

  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    // Verify access token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Check if the token has expired
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < now) {
      return res.sendStatus(403); // Forbidden, token expired
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.sendStatus(403); // Forbidden if the user is not found
    }

    // Generate a new access token if needed
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    return res.sendStatus(403); // Forbidden on any verification error
  }
};
module.exports = {
  signUpUser,
  loginUser,
  checkRefreshToken,
  checkAccessToken,
};
