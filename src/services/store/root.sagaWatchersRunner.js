import { fork } from 'redux-saga/effects'
import { watchFetchTitle } from 'modules/helloWorld/helloWorld.sagas'

function * rootSaga () {
  yield [
    fork(watchFetchTitle)
  ]
}

export default sagaMiddleware => {
  sagaMiddleware.run(rootSaga)
}
