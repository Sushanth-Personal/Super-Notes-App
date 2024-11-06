const express = require("express");
const jwt = require('jsonwebtoken');
const { loginUser, signUpUser,checkRefreshToken } = require("../controllers/authControllers");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", signUpUser);
router.post('/refresh', checkRefreshToken);

module.exports = router;
