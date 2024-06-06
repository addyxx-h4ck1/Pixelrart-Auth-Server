require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const server = express()
const signUpRoute = require('./routes/auth-signup')
const signInRoute = require('./routes/auth-signin')
const resetPasswordRoute = require('./routes/auth-reset-pwd')
const sendPwdChangeLink = require('./routes/auth-confirm-pwd-reset')

//middleware
server.use(cors())
server.use(express.json())

//port
const port = process.env.PORT || 3001

//routes
server.use('/api/signup', signUpRoute)
server.use('/api/signin', signInRoute)
server.use('/auth/sendmail', sendPwdChangeLink)
server.use('/api/reset-password', resetPasswordRoute)

//test route
server.get('/api', (req, res) => {
  res.status(200).json({ ok: true })
})

server.all('*', (req, res) => {
  res.sendStatus(404)
})

//Connect DB & Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to mongoDB')
    server.listen(port, () => console.log(`server is running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
startServer()
