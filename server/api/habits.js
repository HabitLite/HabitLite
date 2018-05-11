const router = require('express').Router()
const { Habit } = require('../db/models')
module.exports = router

//Get all theCustom habits
router.get('/', (req, res, next) => {
    Habit.findAll()
        .then(habits => res.json(habits))
        .catch(next)
})

//Get allCustom habits by categoryId
router.get('/:userId/:categoryId', (req, res, next) => {
    Habit.findAll({
        where: {
            categoryId: req.params.categoryId
        }
    })
        .then(habits => res.json(habits))
        .catch(next)
})
