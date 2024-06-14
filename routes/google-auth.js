const express = require('express')
const { googleAuthLogin } = require('../controllers/google-auth')
const { verifyGoogleToken } = require('../middleware/verify-google-token')
const router = express.Router()

router.get('/', verifyGoogleToken, googleAuthLogin)

module.exports = router
