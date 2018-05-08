import React from 'react';
import {connect} from 'react-redux'


/**
 * COMPONENT
 */
const Habits = props => {

  const updateXP = () => {
    props.XP++ //this is more pseudocode than anything.  Will eventually want to actually update user on state
  }
  return (
      <div className="habits-list">
         <label className="habits-label">My Habits</label>
          <ul>
              <li><input type="checkbox" className="check" onClick={updateXP()} /><p>checkbox 1</p></li>
              <li><input type="checkbox" className="check" onClick={updateXP()} /><p>checkbox 2</p></li>
              <li><input type="checkbox" className="check" onClick={updateXP()} /><p>checkbox 3</p></li>
          </ul>
      </div>
  )
}

const mapState = state => {
  return {
    XP: state.user.XP,
    level: state.user.level
  }
}

export default connect(mapState, null)(Habits);
