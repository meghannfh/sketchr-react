const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");

//login route
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

//logout
router.get("/logout", userController.getLogout)

//signup route
router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);

//get profile


module.exports = router