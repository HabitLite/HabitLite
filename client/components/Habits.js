import React from 'react';
import { connect } from 'react-redux'
import { update, fetchHabits } from '../store'


/**
 * COMPONENT
 */
class Habits extends React.Component {

  constructor(props) {
    super(props)
    console.log('this.props in constructor', props)
    // const { userId, categoryId, XP, HP } = props

    // props.updateUser = props.updateUser.bind(this, userId, categoryId, XP, HP)
    // props.getHabits = props.getHabits.bind(this, userId, categoryId)
  }

  componentDidMount() {

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1", this.props.getHabits(this.props.userId, this.props.categoryId))
  }

  render() {

    const { habits } = this.props

    console.log('habits in HABITs: ', habits)



    // const addHPFromIncompleteHabits = () => {

    // }
    return ( // TODO: eventually use map and stop using dummy data; need to have logic for HP decreasing upon checkboxes remaining unchecked by 00:00 every day; need to ensure that XP remain unaffected when checklist is reset
      <div className="habits-list">
        <label className="habits-label">My Habits</label>
        {/* <button></button> */}
        <ul>
          {
            habits && habits.map( habit => {
              return (
                <li key={habit.id}><input type="checkbox" className="unChecked" onClick={this.props.updateUser.bind(this, this.props.userId, habit.categoryId, this.props.XP)} /><p>{habit}</p></li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

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
    getHabits(userId, categoryId) {
      dispatch(fetchHabits(userId, categoryId))
    },
    updateUser(userId, categoryId, XP, evt) {
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
