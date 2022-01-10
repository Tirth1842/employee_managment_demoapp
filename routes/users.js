
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../models/User');

//Register page
router.get('/Register', (req,res) => res.render('register'));

//Register user.
router.post('/register',(req,res) => {
    const{ name, email, password, password2 } = req.body; // getting ans assigning the details from body of url
    let errors= [];

    //check required field
    if(!name || !email || !password || !password2){
        console.log('1');
        errors.push({ msg: 'Please fill in all fields'});
    }

    //check password match
    if(password!=password2){
        errors.push({ msg: 'Password do no match'});
    }

    //check pass length
    if(password.length<6){
        errors.push({ msg: 'Password must be atleast 6 character'});
    }
    
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    
    }else{
        //validation passed 
        var queryCheck = {
            text: 'SELECT email FROM public."Users" WHERE email = $1',
            values: [email]
        }
        db.query(queryCheck)
            .then((result) => {
                if(result.rowCount>0) {
                    console.log(result);
                    errors.push({msg: 'Email is already registered'})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
        
                });
                }else{
                    
                      var newPassword = password;
                      bcrypt.genSalt(10, (err,salt) => 
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                                if(err) throw err;
                            // set password to hashed
                                newPassword = hash;
                                // save user
                                var queryConfig = {
                                    text: 'INSERT INTO public."Users"(user_name, email, password) VALUES($1, $2, $3);',
                                    values: [name, email, newPassword]
                                  };
                                db.query(queryConfig)
                                .then((user)=>{req.flash('success_msg', 'You are now registered and can log in');
                                        res.redirect('/users/login');})
                                .catch((err) => console.log(err));
                                }))
                            
                }   
            })
            .catch(err => console.log(err));
        
        
    }
})

// Login render
router.get('/login',(req,res)=>res.render('login'));

// Login User
router.post('/login',(req,res) => {
    const{  email, password } = req.body;
    
    if(!email || !password){
        req.flash('error_msg','Please fill the details');
        res.render('login');
    }
    else{
        db.query('SELECT  email, password FROM public."Users" WHERE email=$1', [email])
        .then((result) => {
            
            if(result.rowCount==0){
                console.log('hello');
                req.flash('error_msg1', 'User not registered')
                res.render('login');
            }else{
                // match the password
                bcrypt.compare(password, result.rows[0].password, (err,isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return res.redirect('/dashboard');
                    } else {
                        req.flash('error_msg', 'Password incorrect');
                        res.redirect('/users/login');
                    }
            });
            }
            
        })
        .catch(err => console.log(err));
    }

    

})
module.exports = router;