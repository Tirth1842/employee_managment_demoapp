const db = require('../models/User');

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
             db.query('SELECT first_name, last_name,email,id FROM public.employe_details ORDER BY id')
            .then((result) => {
                res.render('dashboard', {
                    details: result.rows
                })
            })
            .catch(err => console.log(err));
       
           
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
    employe_delete
}