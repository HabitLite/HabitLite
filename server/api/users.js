const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and username fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'username']
  })
    .then(users => res.json(users))
    .catch(next)
})


router.post('/', (req, res, next) => { //May or may not work (sorry)
  User.create(req.body)
    .then(user => res.json(user))
    .then(() => {
      res.status(201).end()
    })
    .catch(next)
})

router.get('/:username', (req, res, next) => { //Change test to reflect changing userId to username
  User.findOne({
    where: {
      username: req.params.username
    },
    attributes: ['id', 'username']
  })
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      user.update(req.body)
    })
    .then(() => {
      res.status(201).end()
    })
    .catch(next)
})

