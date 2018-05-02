const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    validate: {
      min: 1,
      max: 16
    }
  },
  password: {
    type: Sequelize.STRING,
  }
})

module.exports = User

