import axios from 'axios';

//ACTION TYPES
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const GET_USER_CATEGORIES = 'GET_USER_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

//ACTION CREATORS
export function getAllCategories(categories) {
  return { type: GET_ALL_CATEGORIES, categories }
}
export function getUserCategories(allUserCategories) {
  return { type: GET_USER_CATEGORIES, allUserCategories }
}
export function addCategory(category) {
  return { type: ADD_CATEGORY, category }
}

//THUNKS
export const fetchAllCategories = () => {
  return dispatch => {
    axios.get('/api/categories')
      .then(res => {
        // console.log("Getting categories", res.data)
        return res.data
      })
      .then(categories => {
        dispatch(getAllCategories(categories))
      })
      .catch(console.error);
  }
}

export const fetchUserCategories = (userId) => {
  return dispatch => {
    axios.get(`/api/categories/${userId}`)
      .then(res => {
        // console.log("Getting categories", res.data)
        return res.data
      })
      .then(categories => {
        dispatch(getUserCategories(categories))
      })
      .catch(console.error);
  }
}



export const postCategory = (userId, category) => {
  return dispatch => {
    return axios.post(`/api/categories/${userId}`, category)
      .then(res => {
        console.log("Getting categories", res.data)
        return res.data
      })
      .then(newCategory => {

        dispatch(addCategory(newCategory));

      })

      .catch(console.error);
  };
}

//REDUCER(S)
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories
    case GET_USER_CATEGORIES:
      return action.allUserCategories
    case ADD_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}