'use strict'
/*
 * Passport Config File
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('./models/user');
var flash         = require('connect-flash');

module.exports = function(app){

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, username, password, done) {

      process.nextTick(function() {

      User.findOne({ 'local.username' :  username }, function(err, user) {
          if (err)
              return done(err);

          if (user) {
              return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          } else {

              var newUser            = new User();

              newUser.local.username = username;
              newUser.local.password = newUser.generateHash(password);

              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
          }

      });

      });

  }));

  passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {

        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);

            if (!user)

                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))

                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));


            return done(null, user);
        });

  }));

}

