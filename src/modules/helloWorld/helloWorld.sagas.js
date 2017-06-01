import { put, takeEvery } from 'redux-saga/effects'
import actionCreators from './helloWorld.actionCreators'
import actionTypes from './helloWorld.actionTypes'

export const fetchTitle = ({ repository }) => {
  return function * fetchTitleSaga () {
    yield put(actionCreators.fetchTitle())

    const title = yield repository.fetchTitle()
    yield put(actionCreators.fetchTitleFulfilled(title))
  }
}

export function * watchFetchTitle () {
  yield takeEvery(actionTypes.FETCH_TITLE, fetchTitle)
}
