const express = require('express')
const router = express.Router()
// const authController = require("../controllers/auth");
const postsController =  require('../controllers/posts')
// const { ensureAuth, ensureGuest } = require("../middleware/auth");
//Main Routes
// router.get('/', homeController.getIndex)
//router.get('/feed', ensureAuth, postsController.getFeed)
//removed ensureAuth to try and get feed

//router.get('/profile', ensureAuth, postsController.getProfile)
//removed ensureAuth

router.put('/edit/:id', upload.single('profileImage'), authController.editProfile)
router.put("/delete/:id", authController.deletePic)

module.exports = router;