const router = require('express').Router()
const { User, UserHabit } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only certain fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!

    attributes: ['id', 'email', 'username', 'level', 'XP', 'HP']

  })
    .then(users => res.json(users))
    .catch(next)
})


// router.post('/', (req, res, next) => {
//   User.create(req.body)
//     .then(user => res.status(201).json(user))
//     .catch(next)
// })


router.get('/:username', (req, res, next) => {
  User.findOne({
    where: {
      username: req.params.username
    },
    attributes: ['id', 'username', 'level', 'XP', 'HP']
  })
    .then(user => res.json(user))
    .catch(next)
})


//***Test only works some of the time.  Could be some async issue or issue with test***
router.put('/:userId', (req, res, next) => {
  User.findById(+req.params.userId, {
    include: [UserHabit]
  })
    .then(user => {
      let userHabit = user.userHabits.find(habit => {
        return habit.habitId === +req.body.habitId
      })
      userHabit.XP += req.body.XP
      return userHabit.save()
    })
    .then(() => {
      res.end()
    })
    .catch(next)
})

