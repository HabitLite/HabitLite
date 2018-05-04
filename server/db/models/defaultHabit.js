
const Sequelize = require('sequelize')
const db = require('../db')

const DefaultHabit = db.define('defaultHabit', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = DefaultHabit