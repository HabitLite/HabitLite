const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const UserCategory = require('./userCategory')

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
    defaultValue: 'default image'
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: { min: 1 }
  },
  // XP: {
  //   type: Sequelize.VIRTUAL,
  //   get: async function() {
  //     let sum = 0
  //     await UserCategory.findAll({
  //       where: {
  //         userId: this.dataValues.id
  //       }
  //     }).then(categories =>
  //     {
  //       categories.forEach(category =>
  //       {
  //         sum += category.dataValues.XP
  //       })
  //     }).catch(err => console.log(err))
  //     console.log("*******************************sum is", sum)
  //     return sum
  //   }
  // },
  HP: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: { min: 0 }
  },
  progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: { min: 0, max: 100 }
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
