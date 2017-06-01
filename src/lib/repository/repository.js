import { forEachObjIndexed, assoc } from 'ramda'

const Repository = function (client, resources) {
  this.resources = resources
  this.resourcesWithClient = null
  this.injectClientToResources(client)
}

Repository.create = function (client, resources) {
  const api = new Repository(client, resources)
  return api.getResources()
}

Repository.prototype.injectClientToResources = function (client) {
  let resourcesWithClient = {}

  forEachObjIndexed((value, key) => {
    resourcesWithClient = assoc(key, value(client), resourcesWithClient)
  }, this.resources)

  this.resourcesWithClient = resourcesWithClient
}

Repository.prototype.getResources = function () {
  return this.resourcesWithClient
}

export default Repository
