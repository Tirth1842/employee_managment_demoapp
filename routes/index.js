const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const db = require('../models/User');
//Welcome Page
router.get('/', (req,res) => res.status(200).render('welcome'));

// Dashboard

router.get('/dashboard/',(req,res) => {
    // if(req.session.login = true){
        db.query('SELECT first_name, last_name,email,id FROM public.employe_details ORDER BY id')
        .then((result) => {
            res.json(result.rows) 
        })
        .catch(err => console.log(err));
   
    //}
   
    });

module.exports = router;