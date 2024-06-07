const path = require('path')

const sendChangePwdForm = async (req, res) => {
  //get user ID
  const { user_Id } = req.params
  //check if user exists on DB
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
}

module.exports = { sendChangePwdForm }
