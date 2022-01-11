const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const db = require('../models/User');
//Welcome Page
router.get('/', (req,res) => res.render('welcome'));

// Dashboard

router.get('/dashboard/',ensureAuthenticated,(req,res) => {
    db.query('SELECT email, user_name, id FROM public."Users"')
        .then((result) => {
            res.render('dashboard', {
                name: req.user.rows[0].user_name,
                details: result.rows
            })
        })
        .catch(err => console.log(err));
   
    });

module.exports = router;