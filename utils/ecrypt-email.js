const bcrypt = require('bcrypt')

const encryptEmail = async (email) => {
  const secureEmail = await bcrypt.hash(email, 10)
  return secureEmail
}

module.exports = { encryptEmail }
