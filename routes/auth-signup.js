const express = require('express')
const router = express.Router()
const { handleSignup } = require('../controllers/handle-signup')

router.post('/', handleSignup)

module.exports = router
