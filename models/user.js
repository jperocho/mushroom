'use strict'
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        username     : String,
        password     : String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);

function seedUser(email,username,password) {
    User.findOne({ 'local.username' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return done(err);

        // check to see if theres already a user with that email
        if (user) {
            // return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            return done(null, false, console.log('signupMessage', 'That username is already taken.'));
        } else {

            // if there is no user with that email
            // create the user
            var newUser            = new User();

            // set the user's local credentials
            newUser.local.email    = email;
            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                console.log(newUser);
            });
        }

    });
}
module.exports = User;