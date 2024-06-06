// create user schema && model
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: { type: String, default: 'fill', trim: true },
  brandName: { type: String, default: 'fill', trim: true },
  email: { type: String, default: 'fill', trim: true },
  pwd: { type: String, default: 'fill', trim: true },
  joined: { type: Date, default: Date.now },
  pImg: { type: String, default: 'fill', trim: true },
  cImg: { type: String, default: 'fill', trim: true },
  photos: [String],
  services: [String],
  loc: { type: String, default: 'fill' },
  sFb: { type: String, default: 'fill', trim: true },
  sIg: { type: String, default: 'fill', trim: true },
  sWhtpp: { type: String, default: 'fill', trim: true },
  bio: { type: String, default: 'fill', trim: true },
  website: { type: String, default: 'fill', trim: true },
  token: { type: String, default: 'fill', trim: true },
})

module.exports = mongoose.model('User', userSchema)
