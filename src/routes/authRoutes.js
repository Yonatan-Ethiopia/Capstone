const express = require('express');
const route = express.Router();
const { register, login, logout} = require('./src/controllers/authController');
const auth = require('./src/middleware/auth')

route.post('/register' , register);
route.post('/login', login);
route.post('/logout', auth, logout);
module.export = route