const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const db = require('../models/User');
//Welcome Page
router.get('/', (req,res) => res.render('welcome'));

// Dashboard

router.get('/dashboard/',ensureAuthenticated,(req,res) => {
    db.query('SELECT first_name, last_name,email,id FROM public.employe_details')
        .then((result) => {
            res.render('dashboard', {
                details: result.rows
            })
        })
        .catch(err => console.log(err));
   
    });

module.exports = router;