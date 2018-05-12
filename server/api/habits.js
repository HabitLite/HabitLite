const router = require('express').Router()
const { Habit, UserHabit } = require('../db/models')
module.exports = router

//Get all theCustom habits
router.get('/', (req, res, next) => {
    Habit.findAll()
        .then(habits => res.json(habits))
        .catch(next)
})

// Get allCustom habits by categoryId
router.get('/:userId/:categoryId', (req, res, next) => {
    Habit.findAll({
        where: {
            categoryId: req.params.categoryId
        }
    })
        .then(habits => res.json(habits))
        .catch(next)
})

// router.get('/:userId/:categoryId/:habitId', (req, res, next) => {
//     Habit.findById(req.params.habitId)
//     .then(habit => {
//         res.json(habit);
//     })
//     .catch(next);
// })

//working!!!!!!!!
router.get('/:userId/:categoryId', (req, res, next) => {
    Habit.findOne(req.body, {
        where: {
            id: req.body.id
        }
    })
    .then(habits =>
        UserHabit.destroy( {
            where: {
                habitId: habits.id
            }
        }))
    .then(habits => res.json(habits))
    .catch(next)
})




// router.get('/:userId/:categoryId', (req, res, next) => {
//     Habit.findOne(req.body, {
//         where: {
//             id: req.body.id
//         }
//     })
//     .then(habits =>
//         UserHabit.destroy( {
//             where: {
//                 habitId: habits.id
//             }
//         }))
//     .then(habits => res.json(habits))
//     .catch(next)
// })