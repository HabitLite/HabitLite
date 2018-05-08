const router = require('express').Router()
const { User, User_Habit } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and username fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!

    attributes: ['id', 'email', 'username', 'level', 'XP', 'HP']

    // attributes: ['id', 'email']

  })
    .then(users => res.json(users))
    .catch(next)
})


// router.post('/', (req, res, next) => {
//   User.create(req.body)
//     .then(user => res.status(201).json(user))
//     .catch(next)
// })


router.get('/:username', (req, res, next) => { //Change test to reflect changing userId to username
  User.findOne({
    where: {
      username: req.params.username
    },
    attributes: ['id', 'username', 'level', 'XP', 'HP']
  })
    .then(user => res.json(user))
    .catch(next)
})


//***Only works some of the time.  Could be some async issue***
router.put('/:userId', (req, res, next) => {
  //Hoping req.body comes in as:
  // {habitId, XP(that we want to increment by)}
  console.log("!!!!!", req.params, req.body)
  User.findById(+req.params.userId, {
    include: [User_Habit]
  })
    .then(user => {
      console.log(user)
      let userHabit = user.userHabits.find(habit => {
        return habit.habitId === +req.body.habitId
      })
      userHabit.XP += +req.body.XP//fix
      return userHabit.save()
    })
    .then(() => {
      res.end()
    })
    .catch(next)
})

