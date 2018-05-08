const Sequelize = require('sequelize')
const db = require('../db')

const UserHabit = db.define('userHabit', { //maybe also add HP later
  XP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = UserHabit

