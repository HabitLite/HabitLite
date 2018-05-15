import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update, fetchHabits } from '../store';
import { postHabit } from '../store/habits';
import Checkbox from 'material-ui/Checkbox';


class Habits extends Component {
  constructor(props) {
    super(props);
    this.state = {

      isClicked: false,
      habit: {},
      description: '',
      complete: false

    }
  }
  componentDidMount() {
    this.props.getHabits(this.props.userId, this.props.categoryId);
  }

  // componentDidUpdate() {
  //   this.props.getHabits(this.props.userId, this.props.categoryId);
  // }
  // componentWillUpdate() {
  //   this.props.getHabits(this.props.userId, this.props.categoryId);
  // }
  // shouldComponentUpdate(nextState) {
  //   return nextState !== this.state
  // }

  onBtnClick = () => {
    this.setState({ isClicked: true })
  }
  handleChange = (event) => {
    console.log("EVENTSSSSS ", event.target)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const habit = {
      habitGroup: "Custom",
      description: this.state.description,
      complete: false
    }
    const userId = this.props.userId || '';
    const categoryId = this.props.categoryId || '';
    this.props.postNewHabit(userId, categoryId, habit)
    this.setState({ habit: {} })
    this.handleClear(event)
  }
  handleClear = (event) => {
    event.preventDefault();
    this.setState({
      isClicked: false,
      habit: {},
      description: '',
      complete: false

    })
  }


  render() {
    const { habits } = this.props;
    let toDos = [];
    let myHabits = []
    toDos = habits.filter(habit => habit.complete === false)
    myHabits = habits.filter(habit => habit.complete === true)
    console.log("HABITS!!!!!!!!!!!!!!!!", habits)
    console.log("HABITS .... STATE", this.state)
    console.log("HABITS .... PROPS", this.props)
    console.log("false habits", toDos)
    console.log("true habits ", myHabits)
    // const addHPFromIncompleteHabits = () => {

    // }
    // need to have logic for HP decreasing upon checkboxes remaining unchecked by 00:00 every day; need to ensure that XP remain unaffected when checklist is reset
    return (

      <div className="all-habits-container">
        <div className="habits-list">
          <label className="habits-label">My To-Dos</label>
          <button className="add-habit-btn" onClick={this.onBtnClick}><span className="plus">+</span></button>
          {this.state.isClicked &&
            <div className="input-field-habit">
              <form onSubmit={this.handleSubmit}>
                <input
                  name="description"
                  type="text"
                  onChange={this.handleChange}
                  value={this.description}
                  className="habit-input"
                />
                <button type="submit" className="habit-add">Add</button>
              </form>
            </div>
          }
          <ul>

            {toDos &&
              toDos.map(habit => {
                return (
                  <li key={habit.id}>
                    <Checkbox
                      className="unChecked"
                      onClick={this.props.updateUser.bind(
                        this,
                        habit.categoryId,
                        this.props.habitXP
                      )}
                      style={{
                        width: '50%',
                        margin: '10px 60px 4px 60px'
                      }}
                      iconStyle={{
                        fill: '#8099a0'
                      }}
                    />

                    <p className="list">{habit.habit.description}<button className="delete-habit">X</button></p>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="to-dos-list">
          <label className="habits-label">My Habits</label>
          <ul>
            {myHabits &&
              myHabits.map(habit => {
                return (
                  <li key={habit.id}>
                    <Checkbox
                      className="unChecked"
                      onClick={this.props.updateUser.bind(
                        this,
                        habit.categoryId,
                        this.props.habitXP
                      )}
                      style={{
                        width: '50%',
                        margin: '10px 60px 4px 60px'
                      }}
                      iconStyle={{
                        fill: '#8099a0'
                      }}
                    />
                    <p className="list">{habit.habit.description}<button className="delete-habit">X</button></p>
                  </li>
                );
              })}
          </ul>
        </div>

      </div>

    );
  }
}

const mapState = state => {
  console.log('STATE!!!!!!!', state)
  return {
    userId: state.user.id,
    progress: state.user.progress,
    level: state.user.level,
    XP: state.user.XP,
    HP: state.user.HP,
    categoryId: 1,
    habits: state.habits,
    habitXP: 5,

  };
};

const mapDispatch = dispatch => {
  return {
    postNewHabit: (userId, categoryId, habit) => {
      dispatch(postHabit(userId, categoryId, habit))
    },
    getHabits(userId, categoryId) {
      dispatch(fetchHabits(userId, categoryId));
    },
    updateUser(categoryId, incrXP, evt) {
      //make sure class doesn't reset to unchecked every time refresh is hit -- not a problem right now since check doesn't persist anyway
      console.log("THIS RUNS")
      if (!evt.target.checked) incrXP = -incrXP;
      console.log("INCRXP", incrXP)
      dispatch(update(categoryId, incrXP));

    }
  };
};

export default connect(mapState, mapDispatch)(Habits);

