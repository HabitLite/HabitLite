const Promise = require('bluebird');
const db = require('./db/db.js')
const { } = require('./db/models')

const tasks = [
    {
        description: ' Eat three regular meals a day'
    },
    {
        description: 'Have a well-balanced diet'
    },
    {
        description: 'Eat plenty of whole grains, fruit and vegetables but little fat'
    },
    {
        description: 'Drink at least eight glasses of water every day'
    },
    {
        description: 'limit salt and sugar'
    },
    {
        description: 'Avoid junk food such as crisps and sweets'
    },
    {
        description: 'Do not eat too much of any single food'
    },
    {
        description: 'Avoid food with a lot of artificial flavours, colours or chemicals'
    }

]





// --------------------------------------------- USERS START ----------------------------------------------


const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');

const numUsers = 100;
const emails = chance.unique(chance.email, numUsers);

function doTimes(n, fn) {
    const results = [];
    while (n--) {
        results.push(fn());
    }
    return results;
}

function randPhoto(gender) {
    gender = gender.toLowerCase();
    const id = chance.natural({
        min: 1,
        max: gender === 'female' ? 114 : 129
    });
    return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randUser() {
    const gender = chance.gender();
    return User.build({
        name: [chance.first({ gender: gender }), chance.last()].join(' '),
        photo: randPhoto(gender),
        phone: chance.phone(),
        email: emails.pop(),
        password: chance.word(),
        isAdmin: chance.weighted([true, false], [5, 95])
    });
}

function randTitle() {
    const numWords = chance.natural({
        min: 1,
        max: 8
    });
    return chance.sentence({ words: numWords })
        .replace(/\b\w/g, function (m) {
            return m.toUpperCase();
        })
        .slice(0, -1);
}

function randStory(createdUsers) {
    const user = chance.pick(createdUsers);
    const numPars = chance.natural({
        min: 3,
        max: 20
    });
    return Story.build({
        author_id: user.id,
        title: randTitle(),
        paragraphs: chance.n(chance.paragraph, numPars)
    });
}

function generateUsers() {
    const users = doTimes(numUsers, randUser);
    users.push(User.build({
        name: 'Zeke Nierenberg',
        photo: toonAvatar.generate_avatar({ gender: 'male' }),
        phone: '(510) 295-5523',
        email: 'zeke@zeke.zeke',
        password: '123',
        isAdmin: false
    }));
    users.push(User.build({
        name: 'Omri Bernstein',
        photo: toonAvatar.generate_avatar({ gender: 'male' }),
        phone: '(781) 854-8854',
        email: 'omri@omri.omri',
        password: '123',
        isAdmin: true
    }));
    users.push(User.build({
        name: 'Tania Santamaria',
        photo: toonAvatar.generate_avatar({ gender: 'female' }),
        phone: '(555) 555-5555',
        email: 't@t.t',
        password: '123',
        isAdmin: true
    }));
    return users;
}

function createUsers() {
    return Promise.map(generateUsers(), user => user.save());
}






const seed = () =>
    Promise.all(activities.map(activity =>
        Activities.create(activity)
    ))
        .then(() => createUsers())
        .then(() =>
            Promise.all(memberships.map(membership =>
                Membership.create(membership)
            )))
        .catch(err => {
            console.error(err)
            console.log('create failed');
        })


const main = () => {
    db.sync({ force: true })
        .then(() => {
            console.log('seeding the database');
            return seed()
        })
        .catch(err => {
            console.log(err.stack)
        })
        .then(() => {
            db.close();
            return null;
        })
}

main();








