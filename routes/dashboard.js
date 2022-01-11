const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const dashController = require('../controller/dashController');
const db = require('../models/User');
// add employee page
router.get('/add',(req,res) => {
    res.render('add')
})

// add employee 
router.post('/add',(req,res) => {
    const {first_name, last_name, email} = req.body;
    let errors = [];
    
    if(!first_name || !last_name || !email){
        errors.push({ msg: 'Please fill in all fields'});
        console.log('hello');
    }
    if(errors.length>0){
        res.render('add',{
            errors,
            first_name,
            last_name,
            email
        });
    }else {
        db.query('INSERT INTO public.employe_details(first_name, last_name, email) VALUES ($1,$2,$3)',[first_name,last_name,email])
            .then(() => {
                res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
    }

})
// edit form render page
router.get('/:id', dashController.edit_form_page);

// editing the employee details
router.post('/:id',dashController.edit_employee_details);

// deleting the employe record
router.delete('/:id',dashController.employe_delete);




module.exports = router;

