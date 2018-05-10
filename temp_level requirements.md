*** LEVEL ***

THOUGHTS:
  -- Once XP reaches the level's XP (i.e., progress is 100% for that level)

Total XP: 9 => +5 => 14
Max Level XP: 10 => 20
Total Progress to Next Level: 90% => 40%


```js
describe('levelUP()', function () {
  describe('causes', function () {
    it('should be when XP reaches the max XP a user can get for that level (aka max level XP)')
  })

  describe('effects', function () {
    it('should increment level to next level')

    it('should reset progess, accounting for remaining XP from the checked habit that causes the level up')

    it('should reset progress to 0 if there is no remainder')

    it('should reset user\'s HP to max HP for the new level')
  })
})
```