import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_HP = 'UPDATE_HP'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateHP = HP => ({type: UPDATE_HP, HP})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
    .then(res =>
      dispatch(getUser(res.data || defaultUser)))
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

  // dispatch =>
  // {
  //   if (method === 'signup')
  //     axios.post('/api/users', { username, password })
  //       .then(user => {
  //         dispatch(getUser(user.data))
  //         history.push('/home')
  //       }, authError => {
  //         dispatch(getUser({error: authError}))
  //       })
  //       .catch(dipatchOrHistoryErr => console.error(dispatchOrHistoryErr))
  //   if (method === 'login')
  //     axios.get(`/api/users/${username}`)
  //       .then(user => {
  //         dispatch(getUser(user.data))
  //         history.push('/home')
  //       }, authError => {
  //         dispatch(getUser({error: authError}))
  //       })
  // }

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const updateUserHP = HP => {
  dispatch =>
    axios.put(`users/${userId}/hp`)
      .then( res => {
        return dispatch(getUser(res.data))
      })
      .then( () => {
        dispatch(updateHP(HP))
      })
      .catch(console.error)
}


/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_HP:
      return action.HP
    default:
      return state
  }
}
