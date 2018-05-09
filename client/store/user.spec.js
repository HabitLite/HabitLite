'use strict'

/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { me, logout, update } from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe.only('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      return store.dispatch(me())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_USER')
          expect(actions[0].user).to.be.deep.equal(fakeUser)
        })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      return store.dispatch(logout())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('REMOVE_USER')
          expect(history.location.pathname).to.be.equal('/login')
        })
    })
  })

  describe('updateUser', function () {
    describe('update HP', function () {
      const testUser = {
        id: 42,
        XP: 50,
        HP: 10
      }

      const userId = testUser.id

      const testXP = testUser.XP
      const testHP = -5

      it('should subtract the user\'s HP by the correct amount (via negative HP number)', function () {
        mockAxios.onPut(`api/users/${userId}`).replyOnce(204)
        return store.dispatch(update(userId, null, testXP, testHP))
          .then( () => {
            expect(testUser.HP).to.equal(5)
          })
          .catch(console.err)
      })

      it('should add to the user\'s HP by the correct amount (via positive HP number)')

      it('should make the user lose a total of HP that corresponds to the sum total of the habits not checked off')

      it('should fire at 00:00')
    })

  })
})
