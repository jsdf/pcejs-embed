var qsParse = require('qs/lib/parse')
var macplus = require('pcejs-macplus')
var pcejsUtil = require('pcejs-util')

const PATH_FILENAME_REGEX = /\/([^\/]+)$/

function filenameFromPath(filepath) {
  let [match, filename] = filepath.match(PATH_FILENAME_REGEX) || []
  return filename || filepath
}

var queryParams = qsParse(window.location.search.slice(1))

var args = [
  '-r',
  '-c', 'pce-config.cfg',
]

var files = [
  'macplus-pcex.rom',
  'mac-plus.rom',
  'pce-config.cfg',
]

if (queryParams.hard_disks) {
  queryParams.hard_disks.forEach((fileUri, index) => {
    args.push('-I',`disk {drive = 0x8${index}; type = "auto"; file = "${filenameFromPath(fileUri)}"; optional = 0}`)
    files.push(fileUri)
  })
}

if (queryParams.floppy_disks) {
  queryParams.floppy_disks.forEach((fileUri, index) => {
    args.push('-I', `disk {drive = ${index+1}; type = "auto"; file = "${filenameFromPath(fileUri)}"; optional = 1}`)
    files.push(fileUri)
  })
}

// add a loading progress bar. not required, but good ux 
var loadingStatus = pcejsUtil.loadingStatus(document.querySelector('.pcejs-loading-status'))

macplus({
  'arguments': args,
  autoloadFiles: files,
  print: (msg) => console.log(msg),
  printErr: (msg) => console.warn(msg),
  canvas: document.querySelector('.pcejs-canvas'),
  monitorRunDependencies: (remainingDependencies) => {
    loadingStatus.update(remainingDependencies)
  },
})
