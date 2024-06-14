const User = require('../models/user-model')
const { signToken } = require('../utils/sign-access-token')

const googleAuthLogin = async (req, res) => {
  if (!req.params) return res.sendStatus(403)
  const existUser = await User.findOne({ email: req.params })
  if (!existUser) return res.status(404).json('user is not reqistered')
  let user_Id = existUser._id.toString()
  //sign token
  const token = await signToken(user_Id)
  res.status(200).json({ token })
}

module.exports = { googleAuthLogin }
