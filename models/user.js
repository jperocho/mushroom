'use strict'
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

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

        if (err)
            return done(err);

        if (user) {
            return done(null, false, console.log('signupMessage', 'That username is already taken.'));
        } else {

            var newUser            = new User();

            newUser.local.email    = email;
            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function(err) {
                if (err)
                    throw err;
                console.log(newUser);
            });
        }

    });
}

module.exports = User;