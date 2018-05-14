const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const {levelForXP, LEVELS} = require('./level')
const UserCategory = require('./userCategory')

const stat = name => ({
  type: Sequelize.VIRTUAL,
  get() { return this.stats[name] }
})

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
  progress: stat('progress'),
  level: stat('level'),
  xp: stat('xp'),
  hp: stat('hp'),
  lives: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      min: 0
    }
  },
  // progress: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  //   validate: { min: 0, max: 100 },
  //   get: function () {
  //     return method()
  //     // let prevLev, currLev
  //     // return Promise.all([
  //     //   prevLev = Level.findOne({
  //     //     where: {
  //     //       levelId: +this.getDataValue('levelId') - 1
  //     //     }
  //     //   }),
  //     //   currLev = Level.findOne({
  //     //     where: {
  //     //       levelId: +this.getDataValue('levelId')
  //     //     }
  //     //   })
  //     // ]).then(() => 4000)
  //
  //     // return (this.getDataValue('XP') - prevLev.maxXP) / (currLev.maxXP - prevLev.maxXP)
  //   }
  // },
  salt: {
    type: Sequelize.STRING,
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  defaultScope: {
    include: [UserCategory]
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.addXP = async function (categoryId, by) {
  const prevLevel = await this.getLevel()

  await UserCategory.increment('XP', {
    where: {
      userId: this.id, categoryId
    },
    by
  })

  const newLevel = await this.getLevel()

  return {
    progress: await this.getProgress(),
    newLevel,
    prevLevel
  }
}

User.prototype.getXP = function () {
  return UserCategory.sum('XP', {
    where: {
      userId: this.id
    }
  })
}

User.prototype.getHP = function () {
  return UserCategory.sum('HP', {
    where: {
      userId: this.id
    }
  })
}

User.prototype.getLevel = async function () {
  return levelForXP(await this.getXP())
}

User.prototype.getProgress = async function () {

  const currXP = await this.getXP()
  const level = levelForXP(currXP)
  const {maxXP} = LEVELS[level]
  const {maxXP: lastMaxXP} = LEVELS[level - 1] || {maxXP: 0}

  return ((currXP - lastMaxXP) / (maxXP - lastMaxXP)) * 100
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

User.afterFind('updateStats', async user => Object.assign(user, {
    stats: {
      progress: await user.getProgress(),
      level: await user.getLevel(),
      xp: await user.getXP(),
      hp: await user.getHP()
    }
  }
))
