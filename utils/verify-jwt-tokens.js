const jwt = require('jsonwebtoken')

const verifyToken = async (token, secret) => {
  try {
    const result = await jwt.verify(token, secret)
    return result
  } catch (error) {
    return error
  }
}

module.exports = { verifyToken }
