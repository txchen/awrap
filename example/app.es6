import express from 'express'
import awrap from '../index.js'

const app = express()

app.use((req, res, next) => {
  console.log('dummy middleware -- begin')
  next()
  console.log('dummy middleware -- end')
  console.log('')
})

app.use((req, res, next) => {
  console.log('sleep middleware -- begin')
  next()
  console.log('sleep middleware -- end')
})


app.get('/', (req, res) => {
  console.log('processing /')
  res.send('Hello async/await!')
})

app.get('/error', (req, res) => {
  console.log('processing /error')
  let err = new Error('this is an expected error from /error')
  err.status = 403
  throw err
})

app.get('/multi', (req, res, next) => {
  console.log('processing handler 1 in /multi')
  next()
}, (req, res) => {
  console.log('processing handler 2 in /multi')
  res.send('Hello multiple route handlers')
})


app.use((err, req, res, next) => {
  console.log('in catch-all error handler', err)
  res.status(err.status || 500)
  res.json({
    reason: err.message,
    stack: err.stack
  })
})

export default app
