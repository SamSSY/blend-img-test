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
      console.log('img uploaded.');
      const imgWH = $('#originalImg').css(['width', 'height']);
      console.log(imgWH);
      console.log(imgWH.width);
      console.log(imgWH.height);
      let w = parseInt(imgWH.width);
      let h = parseInt(imgWH.height);
      if (w > h && w > 350) {
        console.log('width > 350px');
        $('#originalImg').css({ 'width':  '350px' });
      } else if (w < h && h > 350) {
        console.log('height > 350px');
        $('#originalImg').css({ 'height':  '350px' });
      }
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
      //height: '300px',
    };
    const dropzoneStyles = {
      height: '350px',
      width: '350px',
      border: '1px dashed',
      margin: '20px'
    };
    console.log('render!', files);
    console.log('length', files.length);

    return (
      <div style={{ height: '100%' }} >
        <Dropzone multiple={false} style={dropzoneStyles} onDrop={this.onDrop.bind(this)}>
          {files.length > 0 ?
            <div style={{ overflowX: 'hidden', overflowY: 'hidden' }} >
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
