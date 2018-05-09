import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = (XP, HP) => ({type: UPDATE_USER, XP, HP})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser))
    })
    .catch(err => console.log(err))

export const auth = (email, password, method) => //Can make shorter
  dispatch =>
  axios.post(`/auth/${method}`, { email, password })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/home')
    }, authError => { // rare example: a good use case for parallel (non-catch) error handler
      dispatch(getUser({error: authError}))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const update = (userId, categoryId, XP = 0, HP = 0) => {
  return dispatch => {
      axios.put(`/api/users/${userId}`, {categoryId, XP, HP})
        .then(_ => {
          dispatch(updateUser(XP, HP))
        })
        .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
    case UPDATE_USER:
      return {
        ...state,
        XP: state.XP + action.XP,
        HP: state.HP + action.HP
      }
    default:
      return state
  }
}
