import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
const UPDATE_LEVEL = 'UPDATE_LEVEL'
const UPDATE_HABITS = 'UPDATE_HABITS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateProgress = (progress, XP, HP) => ({ type: UPDATE_PROGRESS, progress, XP, HP })
const updateLevel = () => ({ type: UPDATE_LEVEL })
const updateHabits = habits => ({ type: UPDATE_HABITS, habits })

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser))
    })
    .catch(err => console.log(err))

export const auth = (
  email,
  password,
  method //Can make shorter
) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data))
        history.push('/home')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

export const update = (userId, categoryId, progress, XP = 0, HP = 0) => {
  return dispatch => {
    axios
      .put(`/api/users/${userId}`, { categoryId, progress, XP, HP })
      .then(res => {
        dispatch(updateProgress(res.data, XP, HP))
      })
      .catch(err => console.log(err))
  }
}

export const check = (userId, userHabitId) => {
  return dispatch => {
    axios
      .put(`/api/users/habits/${userId}/${userHabitId}`)
      .then(res => {
        dispatch(updateHabits(res.data))
      })
      .catch(err => console.log(err))
  }
}

export const levelUp = userId => {
  return dispatch => {
    axios
      .put(`api/users/levelUp/${userId}`)
      .then(() => {
        dispatch(updateLevel())
      })
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
    case UPDATE_PROGRESS:
      return {
        ...state,
        progress: action.progress,
        XP: state.XP + action.XP,
        HP: state.HP + action.HP
      }
    case UPDATE_LEVEL:
      return {
        ...state,
        level: state.level + 1
      }
    case UPDATE_HABITS:
      return {
        ...state,
        habits: action.habits
      }
    default:
      return state
  }
}
