import React from 'react';
import { render } from 'react-dom';
import Dropzone from 'react-dropzone';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Cropper from 'cropperjs';
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
      const w = parseInt(imgWH.width, 10);
      const h = parseInt(imgWH.height, 10);
      if (w > h && w > 350) {
        console.log('width > 350px');
        $('#originalImg').css({ 'width': '350px' });
      } else if (w < h && h > 350) {
        console.log('height > 350px');
        $('#originalImg').css({ 'height': '350px' });
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
      height: '350px',
      width: '350px'
    };
    const textStyles = {
      paddingTop: '40%',
      paddingLeft: '10px',
      paddingRight: '10px',
      fontSize: '30px'
    };
    const containerStyles = {
      height: '100%',
      width: '800px',
      paddingTop: '80px',
      marginLeft: 'auto',
      marginRight: 'auto',
    };
    const dropzoneStyles = {
      height: '350px',
      width: '350px',
      border: '1px dashed',
      margin: '20px',
      display: 'inline-block',
      verticalAlign: 'top',
    };
    const resultzoneStyles = {
      height: '350px',
      width: '350px',
      border: '1px dashed',
      margin: '20px',
      display: 'inline-block'
    };
    console.log('render!', files);
    console.log('length', files.length);

    return (
      <div style={{ height: '85%' }}>
        <AppBar title="就博大頭貼產生器" iconClassNameLeft="fa fa-crop fa-2x"
          style={{ position: 'fixed' }}
        />
        <div style={containerStyles} >
          <Dropzone multiple={false} style={dropzoneStyles} onDrop={this.onDrop.bind(this)}>
            {files.length > 0 ?
              <div style={{ overflowX: 'hidden', overflowY: 'hidden' }} >
                <img id="originalImg" src={files[0].preview} />
              </div> :
              <div style={ textStyles } >
                Try dropping a photo here, or click to select files to upload.
              </div>
            }
          </Dropzone>
          <div style={resultzoneStyles} >
            <img id="resultImg" src={"../asset/background.png"} style={imgStyles} />
          </div>
        </div>
        <div className="footer">
          <small>&copy; Shang-Yu, Su </small>
        </div>
      </div>
    );
  }
}

render(<MainBody />, document.getElementById('root'));
