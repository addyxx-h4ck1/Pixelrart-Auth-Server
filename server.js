require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const server = express()
const signUpRoute = require('./routes/auth-signup')

//middleware
server.use(cors())
server.use(express.json())

//port
const port = process.env.PORT || 3001

//routes
server.use('/api/signup', signUpRoute)

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
