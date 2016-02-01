import React from 'react';
import { render } from 'react-dom';
import Dropzone from 'react-dropzone';
import './main.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const initialState = {
  files: []
};

class MainBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    $('img').on('load', () => {
      console.log('img loaded.');
    });
  }

  onDrop(files) {
    this.setState({
      files: files
    });
  }

  render() {
    const { files } = this.state;
    const imgStyles = {
      height: '300px'
    };
    const dropzoneStyles = {
      height: '60%',
      width: '45%',
      border: '1px dashed'
    };
    console.log('render!', files);
    console.log('length', files.length);

    return (
      <div style={{ height: '100%' }} >
        <Dropzone multiple={false} style={dropzoneStyles} onDrop={this.onDrop.bind(this)}>
          {files.length > 0 ?
            <div>
              <img id='originalImg' key={files[0].size}
                    src={files[0].preview} style={imgStyles} />
            </div> : <div>Try dropping some files here, or click to select files to upload.</div>
          }
        </Dropzone>
      </div>
    );
  }
}

render(<MainBody />, document.getElementById('root'));
