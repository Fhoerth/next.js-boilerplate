import nextConnectRedux from 'next-connect-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './root.reducer'
import rootSagaWatchersRunner from './root.sagaWatchersRunner'
import Repository from 'lib/repository/repository'
import createClientInstance from 'lib/client/client'

import { fetchTitle } from 'modules/helloWorld/helloWorld.repository'

export const initStore = initialState => {
  const sagaMiddleware = createSagaMiddleware()
  let store = null

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    )
  } else {
    const DevTools = require('components/RootContainer/DevTools/DevTools.container').default
    const logger = require('redux-logger').default

    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(sagaMiddleware, logger),
        DevTools.instrument()
      )
    )
  }

  rootSagaWatchersRunner(sagaMiddleware)

  const client = createClientInstance('YOUR_BASE_URL', 'YOUR_JWT_TOKEN_THAT_SHOULD_BE_AVALIABLE_IN_STORE')
  const resources = {
    fetchTitle
  }
  const repository = Repository.create(client, resources)
  const dependencies = {
    client,
    repository
  }

  return {
    ...store,
    runSaga (saga, injectDependencies = false) {
      const _saga = injectDependencies ? saga(dependencies) : saga
      return sagaMiddleware.run(_saga)
    }
  }
}

export const nextConnect = nextConnectRedux(initStore)
