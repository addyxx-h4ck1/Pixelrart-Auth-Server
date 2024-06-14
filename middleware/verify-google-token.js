const { jwtDecode } = require('jwt-decode')

const verifyGoogleToken = async (req, res, next) => {
  const { credential } = req.body
  if (!credential) return res.status(400).json('no token provided')
  try {
    const user = jwtDecode(credential)
    req.params = user.email
    next()
  } catch (error) {
    res.status(401).json('Invalid token')
  }
}

module.exports = { verifyGoogleToken }
