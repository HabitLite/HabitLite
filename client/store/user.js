import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/api/users/')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (username, password, method) => //Can make shorter
  dispatch =>
  {
    if (method === 'signup')
      axios.post('/api/users', { username, password })
        .then(user => {
          dispatch(getUser(user.data))
          history.push('/home')
        }, authError => {
          dispatch(getUser({error: authError}))
        })
        .catch(dipatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    if (method === 'login')
      axios.get(`/api/users/${username}`)
        .then(user => {
          dispatch(getUser(user.data))
          history.push('/home')
        }, authError => {
          dispatch(getUser({error: authError}))
        })
  }

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
