const router = require('express').Router()
const { User } = require('../db/models')
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

