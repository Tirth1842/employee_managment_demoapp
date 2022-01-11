
const express = require('express');

const router = express.Router();


const usercontroller = require('../controller/userController');


//Register page
router.get('/Register', usercontroller.register_render);

//Register user.
router.post('/register',usercontroller.register_user)

// Login render
router.get('/login',usercontroller.login_render);

// Login User
router.post('/login', usercontroller.login_user);

// logout user.
router.get('/logout' ,usercontroller.logout_user);

module.exports = router;