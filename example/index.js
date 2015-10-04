// entry point, do not use babel syntax here in this file, so that 'node' can launch this.
require('babel/register')({
  stage: 1
})
// ES5 code here
var server = require('./app')

server.listen(3001, function () {
  console.log('example site listening on http://localhost:3001')
})
