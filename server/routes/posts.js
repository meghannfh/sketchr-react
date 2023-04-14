const express = require("express");
const router = express.Router();
const postsController =  require('../controllers/posts')
const auth = require('../middleware/auth')

//require auth for all post routes
router.use(auth);

//added route to frontend
router.get('/feed', postsController.getFeed)

//haven't added this yet
router.get('/profile', postsController.getProfile)

//added route to frontend
router.get('/:id', postsController.getPost)

//added route to frontend
router.post("/addPost", postsController.addPost) //removed multer's upload.single("image")

//not yet added route
router.delete("/deletePost/:id", postsController.deletePost);

//not yet added route
router.put("/updatePost/:id", postsController.updatePost)

module.exports = router;