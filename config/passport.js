var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function() {

  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: 'c559342d72af612d3be8',

    clientSecret: 'c7cc6cc9dfd20f8a6e42ee7cdc318230965ea78e',

    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate(
      { "login": profile.username },
      { "nome": profile.username },
      function(erro,usuario) {
        if(erro) {
          // console.log(erro);
          return done(erro);
        }

        return done(null,usuario);
      }
    );

  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
    .then(function(usuario) {
      done(null, usuario);
    });
  });

};
