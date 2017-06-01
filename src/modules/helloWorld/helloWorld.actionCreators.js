import actionTypes from './helloWorld.actionTypes'

const fetchTitle = () => ({
  type: actionTypes.FETCH_TITLE
})

const fetchTitleFulfilled = response => ({
  type: actionTypes.FETCH_TITLE_FULFILLED,
  payload: response
})

export default {
  fetchTitle,
  fetchTitleFulfilled
}
