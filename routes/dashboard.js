const express = require('express');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

const db = require('../models/User');

router.get('/:id', (req,res) => {
    const id = req.params.id;
    db.query('SELECT id,email,user_name FROM public."Users" WHERE id = $1',[id])
        .then((result) => {
            res.render('edit',{details: result.rows[0] })
        })

})

router.post('/:id', (req,res) => {
    const {name, email} = req.body;
    const id = req.params.id;
    db.query('UPDATE public."Users" SET user_name = $1, email = $2 WHERE id = $3',[name,email,id])
        .then(() => {
            db.query('SELECT email, user_name, id FROM public."Users"')
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

    db.query('DELETE FROM public."Users" WHERE id = $1',[id])
        .then(() =>{
            res.json({ redirect: '/dashboard'})
        })
        .catch(err => console.log(err));
})


module.exports = router;

