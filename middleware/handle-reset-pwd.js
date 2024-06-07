require('dotenv').config()
const path = require('path')
const jwt = require('jsonwebtoken')

const verifyChangePwdToken = async (req, res, next) => {
  //send form for pwd reset
  const { token } = req.params
  //if no token send (404)
  if (!token) return res.sendStatus(404)
  try {
    const client = await jwt.verify(token, process.env.RESET_PWD_SECRET)
    req.params = client
    req.url = `/api/reset-password/${client.user_Id}`
    next()
  } catch (error) {
    return res.sendStatus(404)
  }
}

module.exports = { verifyChangePwdToken }
