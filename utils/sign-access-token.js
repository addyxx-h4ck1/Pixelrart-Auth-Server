const jwt = require('jsonwebtoken')
require('dotenv').config()

const signToken = async (ID) => {
  const token = await jwt.sign(
    { user_Id: ID },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  )
  return token
}
module.exports = { signToken }
