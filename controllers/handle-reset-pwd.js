const path = require('path')

const resetPassword = async (req, res) => {
  //send form for pwd reset
  const { reset_token } = req.params
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
}

module.exports = { resetPassword }
