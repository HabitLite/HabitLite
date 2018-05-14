const router = require('express').Router()
const { User, UserCategory } = require('../db/models')
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
      userCategory.XP += +req.body.incrXP
      userCategory.HP += +req.body.HP

      // userCategory.save()

      user.getProgress(+req.body.userXP + req.body.incrXP, user.levelId)
        .then(progress => {
          if (progress < 100) {
            res.json(progress)
          }
          else {
            user.levelId++
            user.save()
              .then(newUser => {
                newUser.getProgress(+req.body.userXP + req.body.incrXP, newUser.levelId)
              })
              .then(newProgress => {
                res.json(newProgress)
              })
          }
        })
        .then(userCategory.save())//Will it cause issues if it occurs concurrently with res.json? Prob not... But still
    })
    .catch(next)
})
//
// router.put('/levelUp/:userId', (req, res, next) => {
//   console.log('!!!!!!!!!!!!yo')
//   User.findById(+req.params.userId)
//     .then(user => {
//       user.levelId++
//       user.save()
//     })
//     .then(user => {
//       user.getProgress(+req.body.userXP, user.levelId)
//         .then(progress => {
//           console.log("PROGRESS!!!!!!!!!!!!!!", progress)
//           res.json(progress)
//         })
//     })
//     .catch(next)
// })

