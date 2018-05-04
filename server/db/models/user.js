const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [1, 16] }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [1, 16] }
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: 'default image'
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: { min: 1 }
  },
  XP: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: { min: 0 }
  },
  HP: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: { min: 0 }
  },
  progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: { min: 0, max: 100 }
  }
})

module.exports = User

