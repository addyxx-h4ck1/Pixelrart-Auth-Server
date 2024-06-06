const bcrypt = require('bcrypt')

const decryptPwd = async (plainPwd, hashedPwd) => {
  return await bcrypt.compare(plainPwd, hashedPwd)
}

module.exports = { decryptPwd }
