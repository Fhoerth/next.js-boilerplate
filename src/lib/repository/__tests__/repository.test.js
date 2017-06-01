import sinon from 'sinon'
import { keys } from 'ramda'
import Promise from 'bluebird'

import Repository from '../repository'

describe('Repository', function () {
  const fooResources = {
    fooResource: client => foo => client.foo(foo),
    barResource: client => bar => client.bar(bar)
  }

  const client = {
    foo: sinon.stub().callsFake(foo => Promise.resolve({ data: `foo data: ${foo}` })),
    bar: sinon.stub().callsFake(bar => Promise.resolve({ data: `bar data: ${bar}` }))
  }

  const repository = Repository.create(client, fooResources)

  it('should retrieve a list of functions', function () {
    expect(keys(repository)).toContain('fooResource')
    expect(keys(repository)).toContain('barResource')
    expect(typeof repository.fooResource).toBe('function')
    expect(typeof repository.barResource).toBe('function')
  })

  it('should call client methods', function (done) {
    Promise.all([
      repository.fooResource('fooArgument'),
      repository.barResource('barArgument')
    ]).then(([fooData, barData]) => {
      expect(fooData).toEqual({ data: 'foo data: fooArgument' })
      expect(barData).toEqual({ data: 'bar data: barArgument' })
      done()
    })
  })
})
