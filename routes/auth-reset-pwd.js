const express = require('express')
const router = express.Router()
const { sendChangePwdForm } = require('../controllers/handle-change-pwd')
const { verifyChangePwdToken } = require('../middleware/handle-reset-pwd')

router.get('/:token', verifyChangePwdToken, sendChangePwdForm)

module.exports = router
