const router = require('express').Router()
const { Habit, UserHabit } = require('../db/models')
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

// router.post('/:userId/:categoryId', (req, res, next) => {
//     Habit.create({ categoryId: Number(req.params.categoryId), description: req.body.description, habitGroup: req.body.habitGroup })
//         .then(habit => res.status(201).json(habit.id))
//         .then(habit =>
//             UserHabit.create({ habitId: Number(habit.id), userId: req.params.userId, XP: 10, HP: 100 }))
//         .then(indivhabit => res.status(201).json(indivhabit))
//         .catch(next)
// })

// router.post('/:userId/:categoryId', (req, res, next) => {
//     UserHabit.create({ habitId: req.body.habitId, userId: req.params.userId, XP: 10, HP: 100 })
//         .then(indivhabit => res.status(201).json(indivhabit))
//         .catch(next)
// })


router.post('/:userId/:categoryId', (req, res, next) => {
    Habit.create({ categoryId: Number(req.params.categoryId), description: req.body.description, habitGroup: req.body.habitGroup })
        .then(habit =>
            UserHabit.create({ habitId: Number(habit.id), userId: req.params.userId, XP: 10, HP: 100 }))
        .then(indivhabit => res.status(201).json(indivhabit))
        .catch(next)
})