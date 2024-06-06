const jwt = require('jsonwebtoken')
require('dotenv').config()

const resetPwdToken = async (ID) => {
  const token = await jwt.sign({ user_Id: ID }, process.env.RESET_PWD_SECRET, {
    expiresIn: '3m',
  })
  return token
}
module.exports = { resetPwdToken }
