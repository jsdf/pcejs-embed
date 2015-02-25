var querystring = require('querystring')

var args = [
  '-r',
  '-c', 'pce-config.cfg',
]
var files = [
  'macplus-pcex.rom',
  'mac-plus.rom',
  'pce-config.cfg',
]

var search = querystring.stringify({args: args, files: files})

console.log(search)
