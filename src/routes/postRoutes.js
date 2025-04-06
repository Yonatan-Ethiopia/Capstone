const express = require('express');
const route = express.Router();
const { getPost, createPost, updatePost, deletePost} = require('./src/controllers/createPost');
const auth = require('./src/middleware/auth')

route.get('/' , getPost);
route.post('/:id', auth, createPost);
route.put('/:id', auth, updatePost);
route.delete('/:id', auth, deletePost);
module.export = route