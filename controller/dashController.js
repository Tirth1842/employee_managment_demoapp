const db = require('../models/User');

// displaying the add employee page
const add_page = (req,res) => {
    res.render('add')
}

// add employee
const add_employee = (req,res) => {
    const {first_name, last_name, email} = req.body;
    
    
        db.query('INSERT INTO public.employe_details(first_name, last_name, email) VALUES ($1,$2,$3)',[first_name,last_name,email])
            .then(() => {
                res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
}
// edit form render
const edit_form_page = (req,res) =>{
    const id = req.params.id;
    db.query('SELECT first_name,last_name,email,id FROM public.employe_details WHERE id = $1',[id])
        .then((result) => {
            res.render('edit',{details: result.rows[0] })
        })

}

// editing the employee details
const edit_employee_details = (req,res) => {
    const {first_name,last_name,email} = req.body;
    const id = req.params.id;

    
    db.query('UPDATE public.employe_details SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',[first_name,last_name,email,id])
        .then(() => {
            res.redirect('/dashboard');
           
        })
        .catch(err => console.log(err));
}


// deleting the employee record
const employe_delete = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM public.employe_details WHERE id = $1',[id])
        .then(() =>{
            res.json({ redirect: '/dashboard'})
        })
        .catch(err => console.log(err));
}
module.exports = {
    edit_form_page,
    edit_employee_details,
    employe_delete,
    add_page,
    add_employee
}