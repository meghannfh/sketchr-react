const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        default: "untitled"
    },
    media: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
    canvas: {
        type: String,
        required: false,
    },
    file: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
})

module.exports = mongoose.model("Post", PostSchema)