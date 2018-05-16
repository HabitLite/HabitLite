

const router = require('express').Router()
const { Category, UserCategory } = require('../db/models')
module.exports = router

//Get all theCustom habits
// router.post('/', (req, res, next) => {
//   console.log('req.body ', req.body)
//   Category.create(req.body)
//     .then(category => res.status(201).json(category))
//     .catch(next)
// })

router.post('/:userId', (req, res, next) => {
  Category.create({ name: req.body.name })
    .then(category =>
      UserCategory.create({
        categoryId: Number(category.id), userId: req.body.userId, XP: 5, HP: 100
      }, {
          include: [{
            all: true
          }]
        }))
    .then((newUserCategory) => {
      const { categoryId } = newUserCategory
      return UserCategory.findOne({
        where: {
          userId: req.body.userId,
          categoryId
        },
        include: [{
          model: Category,
          // where: {
          //     categoryId: req.params.categoryId
          // }
        }]
      })
    })
    .then(indivhabit => res.status(201).json(indivhabit))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
})

