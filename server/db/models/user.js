const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Level = require('./level')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  username: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: 'default avatar image'
  },
  lives: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      min: 0
    }
  },
  progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: { min: 0, max: 100 },
    get: function () {
      let prevLev, currLev
      await Promise.all([
        prevLev = Level.findOne({
          where: {
            levelId: +this.getDataValue('levelId') - 1
          }
        }),
        currLev = Level.findOne({
          where: {
            levelId: +this.getDataValue('levelId')
          }
        })
      ])
      console.log("!!!!!!!!!!!!!Progress is", (this.getDataValue('XP') - prevLev.maxXP) / (currLev.maxXP - prevLev.maxXP))

      return (this.getDataValue('XP') - prevLev.maxXP) / (currLev.maxXP - prevLev.maxXP)
    }
  },
  salt: {
    type: Sequelize.STRING,
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
