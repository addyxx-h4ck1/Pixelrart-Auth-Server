const express = require('express')
const router = express.Router()
const {
  sendPwdResetLink,
} = require('../controllers/confirm-pwd-reset-controller')

router.post('/', sendPwdResetLink)

module.exports = router
