const router = require('express').Router()
const { User } = require('../db/models')
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
// router.put('/:userId', (req, res, next) => {
//   User.findById(req.params.userId)
//     .then(user => {
//       user.update(req.body)
//     })
//     .then(() => {
//       res.status(201).end()
//       // next()
//     })
//     .catch(next)
// })

