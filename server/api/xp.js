const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.put('/', async (req, res, next) => {
  await req.user.addXP(+req.body.categoryId, +req.body.incrXP)
  User.find({
    where: {
      id: req.user.id
    }
  })
    .then(user => user.reload())
    .then(user => {
    res.json(user)
    })

})
