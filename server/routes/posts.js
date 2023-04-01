const express = require("express");
const router = express.Router();
// const upload = require('../middleware/multer') ended up not using multer
const postsController =  require('../controllers/posts')
//remember controller functions were wrapped in object
//to access each attach the name to the variable postsController
//using dot notation

//Ive seen these routes written as async functions like so:
//router.get('/:id', async(req, res) => postsController.getPost)

router.get('/feed', postsController.getFeed)
router.get('/profile', postsController.getProfile)
router.get('/:id', postsController.getPost)
router.post("/addPost", postsController.addPost) //removed multer's upload.single("image")
router.delete("/deletePost/:id", postsController.deletePost);
router.put("/updatePost/:id", postsController.updatePost)

module.exports = router;