const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

//Get all theCustom habits
router.post('/', (req, res, next) => {
  console.log('req.body ', req.body)
  Category.create(req.body)
    .then(category => res.status(201).json(category))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
})

