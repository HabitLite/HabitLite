const router = require('express').Router()
const { Habit, UserHabit } = require('../db/models')
module.exports = router

//Get all theCustom habits
router.get('/', (req, res, next) => {
    Habit.findAll()
        .then(habits => res.json(habits))
        .catch(next)
})

// //Get allCustom habits by categoryId
// router.get('/:userId/:categoryId', (req, res, next) => {
//     Habit.findAll({
//         where: {
//             categoryId: req.params.categoryId
//         }
//     })
//         .then(habits => res.json(habits))
//         .catch(next)
// })

// Get allCustom habits by categoryId WORING BY TANIA 
router.get('/:userId/:categoryId', (req, res, next) => {
    UserHabit.findAll({
        where: {
            userId: req.params.userId
        },
        include: [{
            model: Habit,
            where: {
                categoryId: req.params.categoryId
            }
        }]
    })
        .then(habits => res.json(habits))
        .catch(next)
})
// router.get('/:userId/:categoryId', (req, res, next) => {
//     UserHabit.findAll({
//         where: {
//             userId: req.params.userId
//         }
//     })
//         .then(habit =>
//             Habit.findAll({
//                 where: {
//                     id: habit.habitId
//                 }
//             }))
//         .then(personhabit => res.json(personhabit))
//         .catch(next)
// })

router.post('/:userId/:categoryId', (req, res, next) => {
    Habit.create({ categoryId: Number(req.params.categoryId), description: req.body.description, habitGroup: req.body.habitGroup })
        .then(habit =>
            UserHabit.create({ habitId: Number(habit.id), userId: req.params.userId, XP: 10, HP: 100, complete: req.body.complete }))
        .then(indivhabit => res.status(201).json(indivhabit))
        .catch(next)
})

//this is supposed to be deleting the habits pby user 

// router.get(`/:userId/:categoryId`, (req, res, next) => {
//     Habit.findOne(req.body, {
//         where: {
//             id: req.body.id
//         }
//     })
//         .then(habits =>
//             UserHabit.destroy({
//                 where: {
//                     habitId: habits.id
//                 }
//             }))
//         .then(habits => res.json(habits))
//         .catch(next)
// })