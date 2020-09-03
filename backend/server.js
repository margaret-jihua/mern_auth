const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const passport = require('passport')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Smile, you are being watch by the Backend Team'})
    // res.send('Backend home route')
})

app.listen(port, () => {
    console.log('You are listening to localhost 8000');
})