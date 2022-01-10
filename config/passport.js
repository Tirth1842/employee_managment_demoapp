const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../models/User');

module.exports = (passport)=> {
    passport.use('local',
        new LocalStrategy({ usernameField: 'email'}, (email,password, done) => {
            // Match User
            db.query('SELECT  email, password, user_name FROM public."Users" WHERE email=$1', [email])
                .then(user => {
                    if(user.rowCount==0){
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    // match the password
                    console.log(user.rows[0].password);
                    bcrypt.compare(password, user.rows[0].password, (err,isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );
    
    passport.serializeUser(function(user, done) {
        done(null, user);
       });
       passport.deserializeUser(function(user, done) {
        done(null, user);
       });

}