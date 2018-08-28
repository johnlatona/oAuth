const router = require('express').Router();
const passport = require('passport');
const secretID = require('./secrets');
const { User } = require('./db');
module.exports = router;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '247797904986-09nrr4mnbi6it95kgj3ipruu4faglpvm.apps.googleusercontent.com',
    clientSecret: secretID,
    callbackURL: '/auth/google/callback'
  },
  (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const imageUrl = profile.photos[0].value;
    console.log(email, imageUrl);
    User.findOrCreate({
      where: {
        googleId,
        email,
        imageUrl
      }
    }).then(user => {
      console.log(user);
      done(null, user[0]);
    }).catch(done)
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    done(null, user);
  }
  catch(err) {
    done(err);
  }
})

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/callback',
  passport.authenticate('google', {
    successfulRedirect: '/home',
    failureRedirect: '/'
  })
)
