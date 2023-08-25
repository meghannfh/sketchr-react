const User = require('../models/User');
const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    requestType: {
        type: String,
        required: false,
        default: untitled
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
    requestDetails: {
        type: String,
        required: true,
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    requestedOnDate: {
        type: Date,
        default: new Date,
    },
})

module.exports = mongoose.model("Request", RequestSchema)