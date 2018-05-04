const router = require('express').Router()
const { DefaultHabit } = require('../db/models')
module.exports = router

//Get all the default habits
router.get('/', (req, res, next) => {
    DefaultHabit.findAll()
        .then(habit => res.json(habit))
        .catch(next)
})

//Get all default habits by categoryId
router.get('/:categoryId', (req, res, next) => {
    DefaultHabit.findAll({
        where: {
            categoryId: req.params.categoryId
        }
    })
        .then(habit => res.json(habit))
        .catch(next)
})