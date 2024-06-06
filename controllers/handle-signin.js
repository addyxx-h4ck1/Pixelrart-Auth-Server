// this route handles signIn and jwt tokens asignments
const User = require('../models/user-model')
const { decryptPwd } = require('../utils/decrypt-pwd')
const { signToken } = require('../utils/sign-access-token')

const handleSignin = async (req, res) => {
  //destructure the body
  const { uniqueID, pwd } = req.body
  //check if credentials are available (if not send 400)
  if (!uniqueID || !pwd) return res.sendStatus(400)
  try {
    //check if user exist (if not send 404)
    const existUser = await User.findOne({ userName: uniqueID })
    const existUserEmail = await User.findOne({ email: uniqueID })
    if (!existUser && !existUserEmail)
      return res.status(404).json(`oops! ${uniqueID} not found`)

    const userID = existUser
      ? existUser._id
      : existUserEmail
      ? existUserEmail._id
      : null //get the ID
    const loggedUser = await User.findById(userID) // get the user form DB
    //authenticate user with passsword
    const auth = await decryptPwd(pwd, loggedUser.pwd)
    if (!auth) return res.status(401).json(`wrong password`) //if wrong password ( send 401)
    // asign a JWT
    const token = await signToken(loggedUser._id.toString())
    res.json({ token })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

module.exports = { handleSignin }
