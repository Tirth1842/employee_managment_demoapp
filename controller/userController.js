const db = require('../models/User');
//const passport = require('passport');
const bcrypt = require('bcryptjs');


// //login user
// const login_user =(req,res,next) => {
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true // automatically generates the error.
//     })(req,res,next);
// }

const login_user = (req,res) => {
    const{  email, password } = req.body;
    
    console.log(req.body);
   // res.json({"msg":"form submitted"});
    if(!email || !password){
        
        res.json({"err":'Fill the following field'})
    }else{
        //match user
        db.query('SELECT  email, password FROM public."Users" WHERE email=$1', [email])
        .then((result) => {
            
            if(result.rowCount==0){
                console.log('hello');
                res.json({"err": 'user not registerd'})
            }else{
                // match the password
                bcrypt.compare(password, result.rows[0].password, (err,isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return res.json({"msg":'login successfull'});
                    } else {
                        
                        res.json({"err":'password incorrect'});
                    }
            });
            }
            
        })
        .catch(err => console.log(err));

    }
    
}
// logout user
const logout_user = (req,res) => {
    req.session.login = false;
    req.logout();
    res.json({'msg':'logout successful'})
   // req.flash('success_msg', 'You are logged out');
   // res.redirect('/users/login');
}

module.exports = {
    login_user,
    logout_user
}

// other method for login user

// router.post('/login',(req,res) => {
//     const{  email, password } = req.body;
    
//     if(!email || !password){
//         req.flash('error_msg','Please fill the details');
//         res.render('login');
//     }
//     else{
//         //match user
//         db.query('SELECT  email, password FROM public."Users" WHERE email=$1', [email])
//         .then((result) => {
            
//             if(result.rowCount==0){
//                 console.log('hello');
//                 req.flash('error_msg1', 'User not registered')
//                 res.render('login');
//             }else{
//                 // match the password
//                 bcrypt.compare(password, result.rows[0].password, (err,isMatch) => {
//                     if(err) throw err;

//                     if(isMatch) {
//                         return res.redirect('/dashboard');
//                     } else {
//                         req.flash('error_msg', 'Password incorrect');
//                         res.redirect('/users/login');
//                     }
//             });
//             }
            
//         })
//         .catch(err => console.log(err));
//     }

    

// })
