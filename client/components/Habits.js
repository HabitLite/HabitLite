import React from 'react';
import {connect} from 'react-redux'
import {update} from '../store'


/**
 * COMPONENT
 */
const Habits = props => {
  let categoryId = 1, XP = 5
  return ( // TODO: eventually use map and stop using dummy data; need to have logic for HP decreasing upon checkboxes remaining unchecked by 00:00 every day; need to ensure that XP remain unaffected when checklist is reset
      <div className="habits-list">
         <label className="habits-label">My Habits</label>
          <ul>
              <li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 1</p></li>
              <li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 2</p></li>
              <li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 3</p></li>
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
    updateXP(userId, categoryId, XP) {
      dispatch(update(userId, categoryId, XP))
    }
  }
}

export default connect(mapState, mapDispatch)(Habits);
