const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

//login route
router.post("/login", userController.postLogin);

//signup route
router.post("/signup", userController.postSignup);

//get profile


module.exports = router