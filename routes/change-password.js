const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const express = require('express')
const { hashPwd } = require('../utils/encrypt-pwd')
const router = express.Router()
require('dotenv').config()

router.post('/', async (req, res) => {
  //get auth Token & ddata received
  const { authorization } = req.headers
  const { newPasssword } = req.body
  if (!authorization) res.sendStatus(401)
  //check if token is valid
  let token = authorization.split(' ')[1]
  try {
    const decode = jwt.verify(token, process.env.RESET_PWD_SECRET)
    // hasg the pwd & change the usersPwd
    const newPwd = await hashPwd(newPasssword)
    //confirm if user is registred
    const existUser = await User.findById(decode.user_Id)
    if (!existUser)
      return res
        .status(404)
        .json('unauthorized, we could not process your request')
    //update the users PWD
    const updatedUserInfo = await User.findByIdAndUpdate(decode.user_Id, {
      pwd: newPwd,
    })
    res.status(201).json('password changed redirect to login......')
  } catch (error) {
    res.sendStatus(401)
  }
})

module.exports = router
