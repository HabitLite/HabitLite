'use strict';

import axios from 'axios';
// import history from '../history'

// ACTION TYPES
// const WRITE_CATEGORY_NAME = 'WRITE_CATEGORY_NAME';
const GET_HABITS = 'GET_HABITS';
const ADD_HABIT = 'ADD_HABIT'
const DELETE_HABIT = 'DELETE_HABIT';

// ACTION CREATORS
// export function writeCategoryName (categoryName) {
//   const action = { type: WRITE_CATEGORY_NAME, categoryName };
//   return action;
// }

const getHabits = habits => ({ type: GET_HABITS, habits });
export function addHabit(habit) {
  return { type: ADD_HABIT, habit}
}
const deleteHabit = habit => {
    return {type: DELETE_HABIT, habit}
}

// THUNK CREATORS
export const fetchHabits = (userId, categoryId) => {
  return dispatch => {
    axios
      .get(`/api/habits/${userId}/${categoryId}`)
      .then(res => res.data)
      .then(habits => {
        dispatch(getHabits(habits)); //Something goes wrong after this point
      })
      .catch(console.error);
  };
};



// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    // case WRITE_CATEGORY_NAME:
    //   return action.categoryName;
    case GET_HABITS:
      return action.habits;
    default:
      return state;
  }
}
