
const Sequelize = require('sequelize')
const db = require('../db')

const CustomHabit = db.define('customHabit', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = CustomHabit


