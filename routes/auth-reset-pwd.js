const express = require('express')
const router = express.Router()
const { resetPassword } = require('../controllers/handle-reset-pwd')

router.get('/:reset_token', resetPassword)

module.exports = router
