const express = require("express");
const router = express.Router();
const postsController =  require('../controllers/posts')
const auth = require('../middleware/auth')

//if you need to test routes on Postman without auth comment out 
//router.use(auth) here and in the controllers, remove the user params
//from the .find() in get requests

//require auth for all post routes
router.use(auth);

//added route to frontend
router.get('/feed', postsController.getFeed)

//haven't added this yet
// router.get('/profile', postsController.getProfile)

//added route to frontend
router.get('/:id', postsController.getPost)

//added route to frontend
router.post("/addPost", postsController.addPost) //removed multer's upload.single("file")

//not yet added route
router.delete("/deletePost/:id", postsController.deletePost);

//not yet added route
router.put("/updatePost/:id", postsController.updatePost)

module.exports = router;