var querystring = require('querystring')
var React = require('react')
var {Form, Fields, Field} = require('react-form-for')

const BASE_URL = window.location.origin+window.location.pathname.replace('editor.html', 'embed.html')
const HARD_DISKS = ['hard_disk_1', 'hard_disk_2']
const FLOPPY_DISKS = ['floppy_disk_1', 'floppy_disk_2']

const pathGetFilenameRegex = /\/([^\/]+)$/;

function pathGetFilename(path) {
  var matches = path.match(pathGetFilenameRegex);
  if (matches && matches.length) {
    return matches[1];
  } else {
    return path;
  }
}

class Editor extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      value: {
        hard_disk_1: "hd1.qed",
        hard_disk_2: "",
        floppy_disk_1: "",
        floppy_disk_2: "",
      }
    }
  }

  handleChange(updatedValue) {
    this.setState({value: updatedValue})
  }

  render() {
    var {value} = this.state        
    var args = [
      '-r',
      '-c', 'pce-config.cfg',
    ]
    var files = [
      'macplus-pcex.rom',
      'mac-plus.rom',
      'pce-config.cfg',
    ]

    HARD_DISKS.forEach((name, index) => {
      if (value[name]) {
        args.push('-I',`disk {drive = 0x8${index}; type = "auto"; file = "${pathGetFilename(value[name])}"; optional = 0}`)
        files.push(value[name])
      }
    })

    FLOPPY_DISKS.forEach((name, index) => {
      if (value[name]) {
        args.push('-I', `disk {drive = ${index+1}; type = "auto"; file = "${pathGetFilename(value[name])}"; optional = 1}`)
        files.push(value[name])
      }
    })
    
    var embedUrl = BASE_URL+'?'+querystring.stringify({args, files})

    return (
      <Form for={value} onChange={(v) => this.handleChange(v)}>
        <h2>PCE.js embed editor</h2>
        {HARD_DISKS.map((name) => <Field for={name} key={name} />)}
        {FLOPPY_DISKS.map((name) => <Field for={name} key={name} />)}
        <label>
          Embed url
          <textarea
            value={embedUrl}
            onFocus={(e) => e.target.select()}
            readOnly
          />
        </label>
      </Form>
    )
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  React.render(<Editor />, document.body)
})
