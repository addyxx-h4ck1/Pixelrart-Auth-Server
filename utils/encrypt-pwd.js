const bcrypt = require('bcrypt')

const hashPwd = async (password) => {
  const hashedPwd = await bcrypt.hash(password, 10)
  return hashedPwd
}

module.exports = { hashPwd }
