import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { update, fetchHabits, postHabit } from '../store';


/**
 * COMPONENT
 */
class Habits extends Component {
  state = {

    isClicked: false,
    habitGroup: '',
    description: '',
    categoryId: ''
  }
  onBtnClick = (event) => {
    this.setState({ isClicked: true })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    this.props.getHabits(this.props.userId, this.props.categoryId);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const habit = {
      habitGroup: 'Custom',
      description: this.state.description,
      categoryId: this.props.categoryId
    }
    const userId = this.props.userId || '';
    this.props.postNewHabit(userId, habit)
  }

  render() {
    const { habits } = this.props;
    console.log("HABITS .... STATE", this.state)
    console.log("HABITS .... PROPS", this.props)
    // const addHPFromIncompleteHabits = () => {

    // }
    // TODO: eventually use map and stop using dummy data; need to have logic for HP decreasing upon checkboxes remaining unchecked by 00:00 every day; need to ensure that XP remain unaffected when checklist is reset
    return (
      <div className="habits-list">
        <label className="habits-label">My Habits</label>
        <button className="add-habit-btn" onClick={this.onBtnClick}><span className="plus">+</span></button>
        {this.state.isClicked &&
          <div className="input-field-habit">
            <form onSubmit={this.handleSubmit}>
              <input
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.description}
                className="habit-input"
              />
              <button type="submit" className="habit-add">Add</button>
            </form>
          </div>
        }
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
                      this.props.habitXP
                    )}
                  />
                  <p>{habit.description}<button className="delete-habit">X</button></p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  console.log('STATE!!!!!!!', state)
  return {
    userId: state.user.id,
    level: state.user.level,
    XP: state.user.XP,
    HP: state.user.HP,
    categoryId: 1,
    habits: state.habits,
    habitXP: 5,
    habit: state.habit
  };
};

const mapDispatch = dispatch => {
  return {
    postNewHabit(userId, habit) {
      dispatch(postHabit(userId, habit))
    },
    getHabits(userId, categoryId) {
      dispatch(fetchHabits(userId, categoryId));
    },
    updateUser(userId, categoryId, XP, evt) {
      //make sure class doesn't reset to unchecked every time refresh is hit -- not a problem right now since check doesn't persist anyway
      if (evt.target.className === 'checked') {
        XP = -XP;
        evt.target.className = 'unChecked';
      } else if (evt.target.className === 'unChecked') {
        evt.target.className = 'checked';
      } else if (evt.target.className === 'unChecked') {
        evt.target.className = 'checked';
      }
      dispatch(update(userId, categoryId, XP));

      console.log('class', evt.target.className);
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
