//this controller handles signup requests
const { encryptEmail } = require('../utils/ecrypt-email')
const { hashPwd } = require('../utils/encrypt-pwd')
const User = require('../models/user-model')

const handleSignup = async (req, res) => {
  //destructure the req body
  const { userName, brandName, email, pwd } = req.body
  //check for missing (send 400 if any )
  if (!userName || !brandName || !email || !pwd) return res.sendStatus(400)
  //if all all good ( hash pwd && encrypt email )
  req.body.pwd = await hashPwd(pwd)
  try {
    const createdUser = await User.create(req.body)
    return res.status(201).json(createdUser)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

module.exports = { handleSignup }
