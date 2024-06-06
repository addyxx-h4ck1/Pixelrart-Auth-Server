const express = require('express')
const router = express.Router()
const { handleSignin } = require('../controllers/handle-signin')

router.post('/', handleSignin)

module.exports = router
