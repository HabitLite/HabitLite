import React from 'react';
import {connect} from 'react-redux'
import {update} from '../store'


/**
 * COMPONENT
 */
const Habits = props => {
  let categoryId = 1, XP = 5
  return ( //eventually do for loop and stop using dummy data
      <div className="habits-list">
         <label className="habits-label">My Habits</label>
          <ul>
            <div className="mdc-switch">
              <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" role="switch">
                <div className="mdc-switch__background">
                  <div className="mdc-switch__knob"></div>
                </div>
            </div>
            <label htmlFor="basic-switch">off/on</label>
              {/*<li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 1</p></li>*/}
              {/*<li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 2</p></li>*/}
              {/*<li><input type="checkbox" className="check" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 3</p></li>*/}
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
