const User = require('../models/user-model')
const { sendResetLink } = require('../utils/email-sender')
const { resetPwdToken } = require('../utils/reset-pwd-token')

const sendPwdResetLink = async (req, res) => {
  //destructure
  const { email } = req.body
  //check if no email (send 409)
  if (!email) return res.status(409).json('please provide credentials')
  //check if the email exist in the DB
  const existUser = await User.findOne({ email: email })
  if (!existUser) return res.status(404).json(`oops! ${email} not found`)
  //sign a token
  const resetToken = await resetPwdToken(existUser._id.toString())
  //send mail
  try {
    const result = await sendResetLink(resetToken)
    res.status(201).json('link has been sent to email')
  } catch (error) {
    console.log(error)
    res.status(500).json('there was an error please try again')
  }
}

module.exports = { sendPwdResetLink }
