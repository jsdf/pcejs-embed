var querystring = require('querystring')
var macplus = require('pcejs-macplus')
var utils = require('pcejs-util')

function assertExists(value, name) {
  if (value != null) {
    throw new Error(name+' not specified')
  }
}

var queryParams = querystring.parse(window.location.search.slice(1)) 
assertExists(queryParams.args, 'args')
assertExists(queryParams.files, 'files')

// add a loading progress bar. not required, but good ux 
var loadingStatus = utils.loadingStatus(document.querySelector('.pcejs-loading-status'))

macplus({
  'arguments': queryParams.args,
  autoloadFiles: queryParams.files,
  print: function(msg) { console.log(msg) },
  printErr: function(msg) { console.warn(msg) },
  canvas: document.querySelector('.pcejs-canvas'),
  monitorRunDependencies: function (remainingDependencies) {
    loadingStatus.update(remainingDependencies)
  },
})
