const cloudinary = require("../middleware/cloudinary");
const Post = require('../models/Post')
const User = require('../models/User')
const multer = require('multer')

//we're wrapping all of our functions in an object so
//when we import these functions in our routers
//we need to use dot notation to access each individual function
//in their respective routes
module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
            res.render('profile.ejs', { posts: posts, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    getFeed: async (req, res) => {
        try{
            const posts = await Post.find({}).sort({ createdAt: 'desc' }).lean()

            res.json(posts)
        }catch(err){
            res.status(400).json({error: err})
        }
    },
    getPost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
            const artist = await User.findById({ _id: post.user})
        res.render('post.ejs', { post: post, user: req.user, artist: artist })
        }catch(err){
            console.error(err)
        }
    },
    addPost: async (req, res) => {
        console.log(req.body)
        console.log(req.files)

        try{
            // const result = await cloudinary.uploader.upload(req.file.path)
            // console.log(result)
            // let newPost = await Post.create({
            //     prompt: req.body.prompt,
            //     media: req.body.media,
            //     size: req.body.size,
            //     canvas: req.body.canvas,
            //     image: result.secure_url,
            //     description: req.body.description,
            // });
            // res.status(200).json(newPost)
        }catch(err){
            res.status(400).json({err: err.message})
            console.error(err)
        }

        // const { prompt, media, size, canvas, image, description } = req.body
        // console.log(req.body)

        // try{

        //     let newPost = await Post.create({
        //         prompt: prompt,
        //         media: media,
        //         size: size,
        //         canvas: canvas,
        //         image: image,
        //         description: description,
        //     })
            //originally we took care of the cloudinary stuff here
            //now we're doing that in the client AddPostForm component
            // let newPost = await Post.create({
            //     prompt: prompt,
            //     media: media,
            //     size: size,
            //     canvas: canvas,
            //     image: imageUrl,
            //     description: description,
            // })
        //     res.status(200).json(newPost)
        // }catch(err){
        //     res.status(400).json({err: err.message})
        //     console.error(err)
        // }

            //I also had a user at first... idk how I'm gonna add that back in with auth
            // user: req.user.id,
    },
    deletePost: async (req, res) => {
        try{
            let post = await Post.findById({ _id: req.params.id })
            await cloudinary.uploader.destroy(post.cloudinaryId)
            await Post.deleteOne({ _id: req.params.id })
            console.log('Post Deleted')
            res.redirect('/profile')
        }catch(err){
            res.redirect('/profile')
        }
    },
    updatePost: async (req, res) => {
        try{
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { 
                    media: req.body.media,
                    size: req.body.size,
                    canvas: req.body.canvas,
                    description: req.body.description,
                 }
              );
            console.log('Post updated')
            res.redirect(`/post/${req.params.id}`)
        }catch(err){
            res.redirect('/profile')
        }
    },
}