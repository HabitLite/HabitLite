import React from 'react';
import { connect } from 'react-redux';
import { update, fetchHabits } from '../store';

/**
 * COMPONENT
 */
class Habits extends React.Component {
  componentDidMount() {
    this.props.getHabits(this.props.userId, this.props.categoryId);
  }

  render() {
    const { habits } = this.props;

    // const addHPFromIncompleteHabits = () => {

    // }
    // TODO: eventually use map and stop using dummy data; need to have logic for HP decreasing upon checkboxes remaining unchecked by 00:00 every day; need to ensure that XP remain unaffected when checklist is reset
    return (
      <div className="habits-list">
        <label className="habits-label">My Habits</label>
        {/* <button></button> */}
        <ul>
          {habits &&
            habits.map(habit => {
              return (
                <li key={habit.id}>
                  <input
                    type="checkbox"
                    className="unChecked"
                    onClick={this.props.updateUser.bind(
                      this,
                      this.props.userId,
                      habit.categoryId,
                      this.props.progress,
                      this.props.habitXP
                    )}
                  />
                  <p>{habit.description}</p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    progress: state.user.progress,
    categoryId: 1,
    habits: state.habits,
    habitXP: 5
  }
}

const mapDispatch = dispatch => {
  return {
    getHabits(userId, categoryId) {
      dispatch(fetchHabits(userId, categoryId));
    },
    updateUser(userId, categoryId, progress, XP, evt) {
      //make sure class doesn't reset to unchecked every time refresh is hit -- not a problem right now since check doesn't persist anyway
      if (evt.target.className === 'checked') {
        XP = -XP;
        evt.target.className = 'unChecked';
      } else if (evt.target.className === 'unChecked') {
        evt.target.className = 'checked';
      } else if (evt.target.className === 'unChecked') {
        evt.target.className = 'checked';
      }
      dispatch(update(userId, categoryId, progress, XP))

      console.log("class", evt.target.className)
    }
  };
};

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
