const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');
const cloudinary = require('../middleware/cloudinary');

//we're wrapping all of our functions in an object so
//when we import these functions in our routers
//we need to use dot notation to access each individual function
//in their respective routes
module.exports = {
    // getProfile: async (req, res) => {
    //     try {
    //         const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
    //         res.render('profile.ejs', { posts: posts, user: req.user })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
    getFeed: async (req, res) => {
        try{
            // const posts = await Post.find({}).sort({ createdAt: 'desc' }).lean()

            const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();

            res.json(posts)
        }catch(err){
            res.status(400).json({error: err})
        }
    },
    getPost: async (req, res) => {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'no such workout'})
        }
        try{
            const post = await Post.findById(id);
            // const artist = await User.findById({ _id: post.user})
        // res.render('post.ejs', { post: post, user: req.user, artist: artist })
            res.status(202).json(post)
        }catch(err){
            res.status(404).json({error: err.message})
        }
    },
    addPost: async (req, res) => {

        //instead of generating cloudinaryURL and ID in frontend,
        //I'll set the uploaded file.name to the image property in the body
        //destructure the body and then send a post request to cloudinary before
        //creating new post also change the name to 'file' instead of 'image
        //for incoming form data
        //ex: const cloudinaryData = await cloudinary.uploader.upload(file)
        //after getting cloudinaryData we need to add it to the post Schema like so:
        //cloudinaryUrl: cloudinaryData.secure_url
        //cloudinaryId: cloudinaryData.publid_id
        //this means the Schema also needs to be updated
        //remove the



         const { prompt, media, size, canvas, file, description } = req.body
         //took care of generating cloudinaryURL in frontend.
         //heard it's not the best for security but it's the only way I could
         //get it to work
         let emptyFields = [];

         if (!prompt) {
            emptyFields.push('title')
         }
         if (!file) {
            emptyFields.push('file')
         }
         if (!description) {
            emptyFields.push('description')
         }

         if (emptyFields.length > 0) {
            return res.status(400).json({err: 'Please fill out all fields', emptyFields})
        }

        try{
            let newPost = await Post.create({
                prompt: prompt,
                media: media,
                size: size,
                canvas: canvas,
                file: file,
                description: description,
                user: req.user.id,
            });
            res.status(200).json(newPost)
        }catch(err){

            res.status(400).json({err: err.message})
            console.error(err)
        }
    },
    deletePost: async (req, res) => {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'no such workout'})
        }

        //needd to know if I need to find a post by the id first
        //in order to get the cloudinaryId and delete it from cloudinary
        //and then delete the post from the DB
        try{
            let post = await Post.findById({ _id: id })

            if(!post){
                return res.status(404).json({ error: 'no such workout'})
            }
            await cloudinary.uploader.destroy(post.cloudinaryId)
            await Post.deleteOne({ _id: id })
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