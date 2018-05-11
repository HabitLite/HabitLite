import axios from 'axios';

//ACTION TYPES

const ADD_CATEGORY = 'ADD_CATEGORY'

//ACTION CREATORS

export function addCategory(category) {
  return { type: ADD_CATEGORY, category}
}

//THUNKS




//REDUCER(S)
export default function reducer(state = '', action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.category
    default:
      return state
  }
}