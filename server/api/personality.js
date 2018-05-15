const router = require('express').Router()
const { Personality } = require('../db/models')
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personalityInsights = new PersonalityInsightsV3({
    username: "f1e45bbd-5924-4c78-ac0a-e41848fac157",
    password: "mU0HQ8MBpf2q",
    version_date: "2017-10-13"
});
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
////This is the route trying to incorporate with above 
router.post('/profile', (req, res, next) => {

    const insight = req.body.insight;
    personalityInsights.profile({
        text: insight
    },
        function (error, result) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(result);
            }
        }
    );
});
//Get personality by user 


router.get('/profile/:userId', (req, res, next) => {
    Personality.findAll(
        {
            where: {
                userId: Number(req.params.userId)
            }
        })
        .then(personality => res.json(personality))
        .catch(next)
})





