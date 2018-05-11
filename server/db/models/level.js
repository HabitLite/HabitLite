const Sequelize = require('sequelize')
const db = require('../db')

const Level = db.define('level', {
  maxHP: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  maxXP: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

module.exports = Level

