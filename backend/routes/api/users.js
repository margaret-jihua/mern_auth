require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWT_SECRET = process.env.JWT_SECRET

// Load User model
const db = require('../../models')

// GET api/user/test (Public)
router.get('/test', (req, res) => {
    res.json({msg: 'User endpoint Ok'})
})

// POST api/user/register (Public)
router.post('/register', (req,res) => {
    db.User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({msg: 'Email already exists'})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error
                    newUser.password = hash
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(error => console.log(error))
                })
            })
        }
    })
})

module.exports = router
