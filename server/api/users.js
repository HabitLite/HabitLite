const router = require('express').Router()
const { User, UserCategory, UserHabit } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only certain fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!

    attributes: ['id', 'email', 'username', 'level']

  })
    .then(users => res.json(users))
    .catch(next)
})

//***Test only works some of the time.  Could be some async issue or issue with test***
router.put('/:userId', (req, res, next) => {
  User.findById(+req.params.userId, {
    include: [UserCategory]
  })
    .then(user => {
      let userCategory = user.userCategories.find(category => {
        return category.categoryId === +req.body.categoryId
      })
      userCategory.XP += +req.body.XP
      userCategory.HP += +req.body.HP

      userCategory.save()

      user.getProgress(req.body.XP, user.levelId).then(progress => {
        res.json(progress) //also perhaps send back total userXP and total userHP
      })
        // .then(userCategory.save())//Will it cause issues if it occurs concurrently with res.json? Prob not... But still
    })
    .catch(next)
})

router.put('/habits/:userId/:userHabitId', (req, res, next) => {
  UserHabit.findById(+req.params.userHabitId)
    .then(habit => {
      habit.checked = !habit.checked
      habit.save()
    })
    .then(() => {
      UserHabit.findAll({
        where: {
          userId: req.params.userId
        }
      })
    })
    .then(habits => {
      res.json(habits)
    })
    .catch(next)
})

router.put('/levelUp/:userId', (req, res, next) => {
  User.findById(+req.params.userId)
    .then(user => {
      user.levelId++
      user.save()
    })
    .catch(next)
})

