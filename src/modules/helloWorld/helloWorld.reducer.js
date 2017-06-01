import actionTypes from './helloWorld.actionTypes'
import defaultState from './helloWorld.defaultState'

const helloWorldReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TITLE: {
      const newState = { ...state, fetchingTitle: true }
      return newState
    }

    case actionTypes.FETCH_TITLE_FULFILLED: {
      const newState = { ...state, title: action.payload, fetchingTitle: false }
      return newState
    }

    default:
      return state
  }
}

export default helloWorldReducer
