const router = require('express').Router()
const { Personality } = require('../db/models')
module.exports = router


//Posting user personality traits for first user or find for existing user 
router.post('/profile/:userId', (req, res, next) => {
    Personality.findOrCreate(
        {
            where: {
                userId: Number(req.params.userId)
            },
            defaults: {
                insight: req.body.insight,
                habitGroup: "DC"
            }
        })
        .then(category => res.status(201).json(category))
        .catch(next)
})
