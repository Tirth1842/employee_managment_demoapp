const db = require('../models/User');
var validator = require("email-validator");

// displaying the add employee page
// const add_page = (req,res) => {
//     res.render('add')
// }

// add employee
const add_employee = (req,res) => {
    const {first_name, last_name, email} = req.body;
    
        if(!first_name || !last_name ||! email) {
            res.json({'err':'please fill the field'})
        }else if(first_name.length < 4 || last_name.length < 4){
            res.json({'err':'Required minimum character 4'})
        }else if(!validator.validate(email)){
            res.json({'err':'Please enter valid email'})
        }
        else{
            db.query('INSERT INTO public.employe_details(first_name, last_name, email) VALUES ($1,$2,$3)',[first_name,last_name,email])
            .then(() => {
                res.json({'message':'employee added successfully'});
            })
            .catch(err => console.log(err));
        }
    
       
}
// edit form render
const edit_form_page = (req,res) =>{
    const id = req.params.id;
    db.query('SELECT first_name,last_name,email,id FROM public.employe_details WHERE id = $1',[id])
        .then((result) => {
            res.json(result.rows[0])
        })

}

// editing the employee details
const edit_employee_details = (req,res) => {
    const {first_name,last_name,email} = req.body;
   
    const id = req.params.id;

    if(!first_name || !last_name || !email) {
        res.json({'err': 'Please fill the detail'})
    } else if (first_name.length < 4 || last_name.length < 4) {
        res.json({'err': 'Required Minimum character 4'})
    } else if(!validator.validate(email)){
        res.json({'err':'Please enter valid email'})
    }
    else{
        db.query('UPDATE public.employe_details SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',[first_name,last_name,email,id])
        .then(() => {
            res.json({'msg':'edited successfully'});
           
        })
        .catch(err => console.log(err));
    }

    
   
}


// deleting the employee record
const employe_delete = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM public.employe_details WHERE id = $1',[id])
        .then(() =>{
            res.json({'msg':'deleted successfully'})
        })
        .catch(err => console.log(err));
}
module.exports = {
    edit_form_page,
    edit_employee_details,
    employe_delete,
    add_employee
}