const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const secretOrKey = require('../utils/keys').secretOrKey;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../utils/keys');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = (passport) => {

    // Used to stuff a piece of information into a cookie
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Used to decode the recieved cookie and persist session
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
    });

    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
           },
            function (email, password, done) {
                User.findOne({ email: email }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    return done(null, user);
                })
            }
        )
    )

    // passport.use(
    //     new JWTStrategy(opts, (jwt_payload, done) => {
    //         User.findById(jwt_payload.id)
    //             .then(user => {
    //                 if (user) {
    //                     return done(null, user);
    //                 }
    //                 return done(null, false);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     })
    // );

    passport.use(new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ googleId: profile.id });
                if (existingUser) {
                    return done(null, existingUser)
                }
                const user = await new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                }).save();
                done(null, user);
            }
            catch (err) {
                done(null, err);
            }
        }
    ));
}