# awrap - async function wrapper for express.js

express.js can take async function as middleware or handler function, however, it cannot handle the error correctly. When error happens, the request will never complete.

awrap turns async function into a normal function that express.js can accept.

## Installation

```
$ npm install awrap
```

## Usage

Just wrap the async function with awrap and pass into express:

```javascript
app.get('/', awrap(async (req, res) => {
  console.log('processing /')
  await sleep(200)
  res.send('Hello async/await!')
}))
```

## Example

[This](./example/app.es6) is an example server implementation.

To run it:

```
$ npm install
$ npm run example
```

## Changelog

**2015-10-04** `0.0.1`
First version.
