import express from 'express'
import awrap from '../index.js'

const app = express()

function sleep(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject(new Error('cannot sleep negtive amount'))
    } else {
      console.log('will sleep for', ms, 'ms')
      setTimeout(resolve, ms)
    }
  })
}

app.use(async (req, res, next) => {
  console.log('dummy middleware -- begin')
  next()
})

app.use(async (req, res, next) => {
  console.log('sleep middleware -- begin')
  await sleep(1000)
  next()
})


app.get('/', async (req, res) => {
  console.log('processing /')
  await sleep(200)
  res.send('Hello async/await!')
})

app.get('/error', awrap(async (req, res) => {
  console.log('processing /error')
  try {
    await sleep(-200)
  } catch (err) {
    console.log('caught error:', err)
    err.status = 403
    throw err
  }
}))

app.get('/error2', awrap(async (req, res) => {
  console.log('processing /error2')
  await sleep(-100)
}))

app.get('/error3', awrap(async (req, res, next) => {
  console.log('processing /error3')
  next(new Error('error3'))
}))

app.get('/multi', async (req, res, next) => {
  console.log('processing handler 1 in /multi')
  next()
}, async (req, res) => {
  console.log('processing handler 2 in /multi')
  res.send('Hello multiple route handlers')
})


app.use(async (err, req, res, next) => {
  console.log('in catch-all error handler', err)
  await sleep(10)
  res.status(err.status || 500)
  res.json({
    reason: err.message,
    stack: err.stack
  })
})

export default app
