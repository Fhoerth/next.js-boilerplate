'use strict'
const localEnv = require('dotenv').config().parsed
const express = require('express')
const uuid = require('uuid')
const next = require('next')
// const csrf = require('csurf')
// const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

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

  // server.use(csrf())
  server.use(expressSession({
    resave: false,
    genid: () => uuid.v4(),
    saveUninitialized: true,
    secret: 'A_SIMPLE_SECRET_STRING',
    cookie: {
      httpOnly: true
      // domain
    }
  }))

  // server.use(cookieParser())
  server.get('*', (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    console.log(req.session.id);
    res.json({ data: 'Ok!' })
    // req.session.regenerate(() => {
    // })
    // return handle(req, res)
  })

  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log(`
      🌎 Ready on http://${process.env.HOST}:${process.env.PORT}

      ⚙️  NODE_ENV = ${process.env.NODE_ENV}`)
  })
})
