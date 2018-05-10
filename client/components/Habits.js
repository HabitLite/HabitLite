import React from 'react';
import { connect } from 'react-redux'
import store, { update, fetchHabits } from '../store'


/**
 * COMPONENT
 */
class Habits extends React.Component {

  constructor() {
    super()

    const { userId, categoryId, XP, HP } = this.props

    this.props.updateUser = this.props.updateUser.bind(this, userId, categoryId, XP, HP)
    this.props.getHabits = this.props.getHabits.bind(this, userId, categoryId)
  }

  componentDidMount() {
    this.props.getHabits()
  }

  render() {

    const { habits } = this.props

    console.log('habits in HABITs: ', habits)



    // const addHPFromIncompleteHabits = () => {

    // }
    return ( // TODO: eventually use map and stop using dummy data; need to have logic for HP decreasing upon checkboxes remaining unchecked by 00:00 every day; need to ensure that XP remain unaffected when checklist is reset
      <div className="habits-list">
        <label className="habits-label">My Habits</label>
        <button></button>
        <ul>
          {
            habits && habits.map( habit => {
              <li><input type="checkbox" className="check" onClick={this.props.updateUser} /><p>{habit}</p></li>
            })
          }
        </ul>
      </div>
    )
  }
}




// <li><input type="checkbox" className="check" onClick={props.updateUser.bind(this, props.userId, categoryId, XP)} /><p>{habit}</p></li>
// <li><input type="checkbox" className="check" onClick={props.updateUser.bind(this, props.userId, categoryId, XP)} /><p>habit 2</p></li>
// <li><input type="checkbox" className="check" onClick={props.updateUser.bind(this, props.userId, categoryId, XP)} /><p>habit 3</p></li>

const mapState = state => {
  return {
    userId: state.user.id,
    level: state.user.level,
    XP: state.user.XP,
    HP: state.user.HP,
    categoryId: 1,
    habits: state.user.habits
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser(userId, categoryId, XP, HP) {
      dispatch(update(userId, categoryId, XP, HP))
    },
    getHabits(userId, categoryId) {
      dispatch(fetchHabits(userId, categoryId))
    }
  }
} // don't we need to make a call to grab habits?

export default connect(mapState, mapDispatch)(Habits);
