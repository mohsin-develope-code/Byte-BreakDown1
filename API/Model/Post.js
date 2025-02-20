const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },

    summary : {
        type: String,
        required: true,
    },

    tags: {
        type: [String],
    },

    content : {
        type: String,
        required: true,
    },

    cover : {
        type: String,
        required: true,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

},
{
        timestamps: true,
})


const Post_Model = mongoose.model("user-post", postSchema);


module.exports = Post_Model;