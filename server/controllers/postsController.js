const Post = require('../models/Post');
// const User = require('../models/User');
const mongoose = require('mongoose');
const cloudinary = require('../middleware/cloudinary').v2;

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

        /*the file in the formData in the request is already encoded 
        correctly but all other input fields will come through as req.body.whatever
        and only the file will come through as req.file.path so you need to separate
        these two diff types of fields when grabbing them from the request*/
         const { prompt, media, size, canvas, description } = req.body
         let emptyFields = [];

         if (!prompt) {
            emptyFields.push('title')
         }
         if (!req.file) {
            emptyFields.push('file')
         } 
         if (!description) {
            emptyFields.push('description')
         }

         if (emptyFields.length > 0) {
            return res.status(400).json({err: 'Please fill out all fields', emptyFields})
        }

        const { path } = req.file;

        try{
            const result = await cloudinary.uploader.upload(path);

            let newPost = await Post.create({
                prompt: prompt,
                media: media,
                size: size,
                canvas: canvas,
                file: result.secure_url,//don't forget to append secure_url to the result from cloudinary
                cloudinaryId: result.public_id,//append publit_id to this one you need it to delete later
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
        try{
            let post = await Post.findById({ _id: id })

            if(!post){
                return res.status(404).json({ error: 'no such workout'})
            }
            await cloudinary.uploader.destroy(post.cloudinaryId)
            await Post.deleteOne({ _id: id })
            res.status(200).json(post)
            console.log('Post Deleted')
        }catch(err){
            res.status(400).json({err: err.message})
            console.error(err)
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

        }catch(err){

        }
    },
}