'use strict'
const localEnv = require('dotenv').config().parsed
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = localEnv.ENV || 'development'
}
const app = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(cookieParser())
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, err => {
    const world = 0x1F30E
    if (err) throw err
    console.log(`
      🌎 Ready on http://${process.env.HOST}:${process.env.PORT}

      ⚙️  NODE_ENV = ${process.env.NODE_ENV}`)
  })
})
