require('babelify/polyfill')
var qsStringify = require('qs/lib/stringify')
var React = require('react')
var {Form, Fields, Field, List} = require('react-form-for')
var {ListEditor} = require('react-form-for').Components

const BASE_URL = window.location.origin+window.location.pathname.replace('editor.html', 'embed.html')

const property = (prop) => (obj) => obj[prop]

class DiskListEditor extends ListEditor {
  static defaultProps = {
    removeItemLabel: 'remove',
    addItemLabel: 'add another',
  }
  render() {
    let rendered = super.render()

    return (
      <div>
        <label>{this.props.label}</label>
        {rendered}
      </div>
    )
  }
}

const makeDisk = () => ({uri: ""})

class Editor extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      value: {
        hard_disks: [{uri: "hd1.qed"}],
        floppy_disks: [],
      }
    }
  }

  handleChange(updatedValue) {
    this.setState({value: updatedValue})
  }

  render() {
    let {value} = this.state
    let query = qsStringify({
      hard_disks: value.hard_disks.map((v) => property('uri')(v||makeDisk())),
      floppy_disks: value.floppy_disks.map((v) => property('uri')(v||makeDisk())),
    })

    let embedUrl = BASE_URL+'?'+query

    return (
      <Form for={value} onChange={(v) => this.handleChange(v)} className="editor">
        <h2>PCE.js embed editor</h2>
        <List
          for="hard_disks"
          component={DiskListEditor}
          className="editor-disks fieldset"
          label="Hard Disk images"
        >
          <Field for="uri" label="Disk image url:" />
        </List>
        <List
          for="floppy_disks"
          component={DiskListEditor}
          className="editor-disks fieldset"
          label="Floppy Disk images"
        >
          <Field for="uri" label="Disk image url:" />
        </List>
        <div className="editor-embed fieldset">
          <label>Embed url</label>
          <textarea
            value={embedUrl}
            onFocus={(e) => e.target.select()}
            rows="4"
            cols="50"
            readOnly
          />
        </div>
      </Form>
    )
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  React.render(<Editor />, document.body)
})
