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
         {/*<button></button>*/}
          <ul>
              <li><input name="1" type="checkbox" className="unChecked" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 1</p></li>
              <li><input name="2" type="checkbox" className="unChecked" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 2</p></li>
              <li><input name="3" type="checkbox" className="unChecked" onClick={props.updateXP.bind(this, props.userId, categoryId, XP)} /><p>checkbox 3</p></li>
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
    updateXP(userId, categoryId, XP, evt) {
      //make sure class doesn't reset to unchecked every time refresh is hit -- not a problem right now since check doesn't persist anyway
      if (evt.target.className === 'checked') {
        XP = -XP
        evt.target.className = 'unChecked'
      }
      else if (evt.target.className === 'unChecked') {
        evt.target.className = 'checked'
      }
      dispatch(update(userId, categoryId, XP))

      console.log("class", evt.target.className)

    }
  }
}

export default connect(mapState, mapDispatch)(Habits);


// {/*<div className="habits-list">*/}
//   {/*<label className="habits-label">My Habits</label>*/}
//   {/*<div className="mdc-switch">*/}
//     {/*<input type="checkbox" id="basic-switch" className="mdc-switch__native-control" role="switch" />*/}
//     {/*<div className="mdc-switch__background">*/}
//       {/*<div className="mdc-switch__knob"></div>*/}
//     {/*</div>*/}
//   {/*</div>*/}
//   {/*<label htmlFor="basic-switch">off/on</label>*/}
// {/*</div>*/}
