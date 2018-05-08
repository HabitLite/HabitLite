import React from 'react';
import {connect} from 'react-redux'
import {update} from '../store'


/**
 * COMPONENT
 */
const Habits = props => {

  return ( //eventually do for loop and stop using dummy data
      <div className="habits-list">
         <label className="habits-label">My Habits</label>
          <ul>
              <li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, 1, 5)} /><p>checkbox 1</p></li>
              <li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, 1, 5)} /><p>checkbox 2</p></li>
              <li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, 1, 5)} /><p>checkbox 3</p></li>
          </ul>
      </div>
  )
}

const mapState = state => {
  return {
    XP: state.user.XP,
    level: state.user.level,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    updateXP(userId, habitId, XP) {
      dispatch(update(userId, habitId, XP))
    }
  }
}

export default connect(mapState, mapDispatch)(Habits);
