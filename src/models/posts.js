const mongoose = require('mongoose');
const postSchema = mongoose.schema({
    title:{ type: string, required: true },
    content:{ type: string, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    category: { type: string, required: true }
});

const posts = mongoose.model('posts', postSchema);
module.exports = posts;
