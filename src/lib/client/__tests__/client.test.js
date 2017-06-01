import createFetchInstance from '../client'
import sinon from 'sinon'

describe('fetch instance', function () {
  const baseUrl = 'http://someCrazyHost:3000/api'
  const server = sinon.fakeServer.create()
  const instance = createFetchInstance(baseUrl, 'J.W.T', 'SESSION.ID')

  server.respondWith('GET', `http://someCrazyHost:3000/api/headers.json`,
    [200, { 'Content-Type': 'application/json' },
      JSON.stringify({})])

  server.respondWith('GET', `http://someCrazyHost:3000/api/data.json`,
    [200, { 'Content-Type': 'application/json' },
      JSON.stringify({ data: 'Ok!' })])

  afterAll(() => {
    server.restore()
  })

  it('should request with the right headers', function (done) {
    instance.get('/headers.json').then(r => {
      const requestHeaders = r.request.requestHeaders
      expect(requestHeaders.Accept).toEqual('application/json')
      expect(requestHeaders.Authorization).toEqual('Bearer J.W.T')
      done()
    })

    setTimeout(() => {
      server.respond()
    })
  })

  it('server should response', function (done) {
    instance.get('/data.json').then(r => {
      expect(r.data).toEqual({ data: 'Ok!' })
      done()
    })

    setTimeout(() => {
      server.respond()
    })
  })
})
