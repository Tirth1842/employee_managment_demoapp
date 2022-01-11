const express = require('express');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

const db = require('../models/User');

router.get('/:id', (req,res) => {
    const id = req.params.id;
    db.query('SELECT first_name,last_name,email,id FROM public.employe_details WHERE id = $1',[id])
        .then((result) => {
            res.render('edit',{details: result.rows[0] })
        })

})

router.post('/:id', (req,res) => {
    const {first_name,last_name,email} = req.body;
    console.log(req.body);
    const id = req.params.id;
    console.log(id);
    db.query('UPDATE public.employe_details SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',[first_name,last_name,email,id])
        .then(() => {
            db.query('SELECT first_name, last_name, email FROM public.employe_details')
            .then((result) => {
                res.render('dashboard', {
                    details: result.rows
                })
            })
            .catch(err => console.log(err));
       
           
        })
        .catch(err => console.log(err));
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM public.employe_details WHERE id = $1',[id])
        .then(() =>{
            res.json({ redirect: '/dashboard'})
        })
        .catch(err => console.log(err));
})


module.exports = router;

