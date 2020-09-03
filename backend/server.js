require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const passport = require('passport')

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// Passport Middleware
app.use(passport.initialize())
require('./config/passport')(passport)


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Smile, you are being watch by the Backend Team'})
    // res.send('Backend home route')
})

const users = require('./routes/api/users')

app.use('/api/users', users)

app.listen(port, () => {
    console.log('You are listening to localhost 8000');
})