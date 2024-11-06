const jwt = require("jsonwebtoken");
const User = require("../../models/userModel"); // Adjust the path based on your project structure

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from

  // Retrieve refresh token from cookies or body
  const refreshToken = req.body.refreshToken; // Adjust based on your method of storing

  // If no token is provided, respond with an error
  if (!token) {
    return res.status(401).json({ message: "No valid access token" }); // Unauthorized if no tokens are provided
  }

  try {
    // Step 1: Check for Access Token
    if (token) {
      // Verify the access token
      try {
        const decodedAccess = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decodedAccess; // Attach user info to the request object
        return next(); // Proceed to the next middleware or route handler
      } catch (err) {
        console.error(
          "Access token not verified, checking for Refresh Token... ",
          err
        );
      }
    }

    // Step 2: If no valid access token, check for Refresh Token
    if (refreshToken) {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ); // Use your refresh token secret

      const user = await User.findById(decodedRefresh.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid refresh token" }); // Forbidden if refresh token is invalid
      }

      // Generate a new access token
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken }); // Return the new access token

      // Optionally, you could also attach the user info to the request object
      req.user = user;
      return next(); // Proceed to the next middleware
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: No refresh token provided" }); // Handle case where no refresh token is provided
    }
  } catch (error) {
    console.error("Error during token verification:", error);
    return res
      .status(403)
      .json({ message: "Forbidden: Token verification error" }); // Forbidden on any verification error
  }
};

module.exports = authenticateToken;
