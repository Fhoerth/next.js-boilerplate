import axios from 'axios'
// import { assocPath } from 'ramda'

export const timeout = 2500

const createInstance = (apiBaseUrl, token = null, sessionId = null) => {
  let instance = axios.create({
    baseURL: apiBaseUrl
  })

  instance.defaults.timeout = timeout

  if (token !== null) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  instance.defaults.headers.common.Accept = 'application/json'

  return instance
}

export default createInstance
