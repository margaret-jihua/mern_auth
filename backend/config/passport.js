require('dotenv').config()

// A passport strategy for authenicating with a JSON web Token 
// This allow to authenicate endpoint using the token
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
// const passport = require('passport')
// const User = mongoose.model('User')
const db = require('../models')

const options = {}
// jwtFromRequest (REQUIRED) function that accepts a request as the 
// only parameter and returns either the JWT as string or null
// fromAuthHeaderAsBearerToken() creates an extractor that looks for the JWT in the auth header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        db.User.findById(jwt_payload.id)
        // jwt_payload is an object literal containing the decoded JWT payload
        // done is a passport callback that has error first sa an argument done(error, user, info)        
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