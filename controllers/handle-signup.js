//this controller handles signup requests
const { hashPwd } = require('../utils/encrypt-pwd')
const User = require('../models/user-model')

const handleSignup = async (req, res) => {
  //destructure the req body
  const { userName, brandName, email, pwd } = req.body
  //check for missing (send 400 if any )
  if (!userName || !brandName || !email || !pwd) return res.sendStatus(400)
  //check if user || email exist (send send a conflict if they do)
  const existUser = await User.findOne({ userName: userName })
  if (existUser)
    return res.status(409).json(`oops! ${userName} is already taken`)
  const existUserEmail = await User.findOne({ email: email })
  if (existUserEmail)
    return res.status(409).json(`oops! ${email} is already taken`)

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
