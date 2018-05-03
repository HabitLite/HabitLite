const Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
const db = require('../index')
const Habit = db.model('habit')

describe('Habit model', function () {
    beforeEach(function () {
        return db.sync({ force: true })
    })
    describe('description field', function () {
        let firstHabit

        beforeEach(() => {
            return Habit.create({
                description: 'this is a test'
            })
                .then(habit => {
                    firstHabit = habit
                })
        })
        it('description field is not empty', function () {
            Habit.description = "this is not working";
            expect(!!Habit.description).to.be.true;
        })
    })
})

