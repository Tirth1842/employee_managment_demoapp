
const express = require('express');

const router = express.Router();


const usercontroller = require('../controller/userController');

// Login render
// router.get('/login',usercontroller.login_render);

// Login User
router.post('/login', usercontroller.login_user);

// logout user.
router.get('/logout' ,usercontroller.logout_user);

module.exports = router;