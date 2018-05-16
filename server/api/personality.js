const router = require('express').Router()
const { Personality } = require('../db/models')
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personalityInsights = new PersonalityInsightsV3({
    username: "f1e45bbd-5924-4c78-ac0a-e41848fac157",
    password: "mU0HQ8MBpf2q",
    version_date: "2017-10-13"
});
const PersonalityTextSummaries = require('personality-text-summary');
const v3EnglishTextSummaries = new PersonalityTextSummaries({
    locale: 'en',
    version: 'v3'
});
module.exports = router


//Posting user personality traits for first user or find for existing user *** TANIA this is working
// router.put('/profile/:userId', (req, res, next) => {
//     Personality.findOrCreate(
//         {
//             where: {
//                 userId: Number(req.params.userId)
//             },
//             defaults: {
//                 insight: req.body.insight,
//                 habitGroup: "DC"
//             }
//         })
//         .then(profile => res.status(201).json(profile))
//         .catch(next)
// })
const getTextSummary = personalityProfile => {
    let textSummary = v3EnglishTextSummaries.getSummary(personalityProfile);
    if (typeof (textSummary) !== 'string') {
        console.log("Could not get summary.")
    } else {
        return textSummary;
    }
}

////This is the route trying to incorporate with above 


router.put('/profile/:userId', (req, res, next) => {
    Personality.findOrCreate(
        {
            where: {
                userId: Number(req.params.userId)
            },
            defaults: {
                insight: req.body.insight,
                habitGroup: "DC",
            }
        })
        .then(profile => {
            console.log("TEST!!!!! inside PUT route", profile[0].dataValues.insight)
            const insight = profile[0].dataValues.insight
            personalityInsights.profile({
                text: insight
            }, function (error, response) {
                if (error)
                    console.log('Error:', error);
                else {
                    console.log("IM IN ", getTextSummary(response));
                    const analysis = getTextSummary(response)

                    return Personality.update({
                        analysis: analysis
                    },
                        {
                            where: { userId: Number(req.params.userId) },
                            returning: true,
                            plain: true
                        })

                        .then(results => res.json(results))
                        .catch(next)
                }
            }
            )


        })
})


//This by itself is working to get watson 
// router.post('/profile', (req, res, next) => {

//     const insight = req.body.insight;
//     personalityInsights.profile({
//         text: insight
//     },
//         function (error, result) {
//             if (error) {
//                 res.send(error);
//             }
//             else {
//                 // getTextSummary(result)
//                 // res.send(result);
//                 res.send({ resuls: result, paragraph: getTextSummary(result) })

//             }
//         }
//     );
// });






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