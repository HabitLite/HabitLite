const Sequelize = require('sequelize')
const db = require('../db')

const User_Habit = db.define('userHabit', {
  XP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = User_Habit

