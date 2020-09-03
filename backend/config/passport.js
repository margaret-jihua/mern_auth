require('dotenv').config()

// A passport strategy for authenicating with a JSON web Token 
// This allow to authenicate endpoint using the token
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const passport = require('passport')
const { deserializeUser } = require('passport')
const User = mongoose.model('User')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        deserializeUser.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                // if the user is found, return null
                return done(null, user)
            }
            // if no user is found
            return done(null, false)
        })
        .catch(error => console.log(error))
    }))
}