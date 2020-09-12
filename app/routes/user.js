var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer();

const logout = require('./user/logout');
const register = require('./user/register');
const login = require('./user/login');

router.route('/register')
    .post(upload.none(), register)

router.route('/login')
    .post(upload.none(), login)

router.route('/logout')
    .get(logout)

module.exports = router;