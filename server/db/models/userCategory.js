const Sequelize = require('sequelize')
const db = require('../db')

const UserCategory = db.define('userCategory', { //maybe also add HP later
  XP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = UserCategory

