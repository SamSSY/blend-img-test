import React from 'react';
import { render } from 'react-dom';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import './main.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const initialState = {
  file: null,
  originalImgDataUrl: '',
  resultImgDataUrl: '',
  isImgComplete: false
};
const imgStyles = {
  height: '350px',
  width: '350px',
};
const textStyles = {
  paddingTop: '45%',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '28px'
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
const iconStyles = {
  color: '#ffffff',
  margin: '9px',
  fontSize: '30px'
};
const imgInputStyles = {
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  width: '100%',
  opacity: 0,
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
      } else if (w <= h && h > 350) {
        console.log('height > 350px');
        $('#originalImg').css({ 'height': '350px' });
      }
      $('#originalImg').cropper({
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        restore: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        minCropBoxWidth: 300,
        minCropBoxHeight: 300,
        minContainerWidth: 350,
        minContainerHeight: 350,
        minCanvasHeight: 300,
        minCanvasWidth: 300,
      });
    });
  }

  handleImgUpload() {
    console.log('handleImgUpload called.');
    const file = $('input[type=file]')[0].files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({ originalImgDataUrl: reader.result, file: file });
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  synthesizeImg() {
    console.log('sybthesize!');
    const canvas = document.getElementById('resultImg');
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    const image = new Image();
    image.src = $('#originalImg').cropper('getCroppedCanvas').toDataURL();
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const backgroundImg = new Image();
      backgroundImg.src = $('#backgroundImg').prop('src');
      backgroundImg.onload = () => {
        context.globalCompositeOperation = 'source-over';
        context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        this.setState({ isImgComplete: true });
        $('#backgroundImg').hide();
      };
    };
  }

  downloadCanvas() {
    console.log('download canvas.');
    const link = document.createElement('a');
    link.download = 'profile.png';
    link.href = document.getElementById('resultImg').toDataURL();
    link.click();
  }

  render() {
    const { file, originalImgDataUrl, isImgComplete } = this.state;
    console.log('render!', file);

    return (
      <div style={{ height: '85%' }}>
        <AppBar title="就博大頭貼產生器"
          iconElementLeft={
            <FontIcon className="material-icons" style={iconStyles} >
              portrait
            </FontIcon>
          }
          style={{ position: 'fixed' }}
        />
        <div style={containerStyles} >
          <div style={dropzoneStyles} >
            {file ?
              <div style={{ overflowX: 'hidden', overflowY: 'hidden' }} >
                <img id="originalImg" src={originalImgDataUrl} />
              </div> :
              <div style={ textStyles } >
                Please upload a photo.
              </div>
            }
          </div>
          <div style={resultzoneStyles} >
            <canvas id="resultImg" style={{ display: isImgComplete ? 'inline' : 'none' }}
              width="700" height="700"
            >
            </canvas>
            <img id="backgroundImg"
              src={"asset/background.png"} style={imgStyles}
            />
          </div>
          <RaisedButton label="Choose an Image"
            style={{ marginLeft: '20px' }}
            icon={
              <FontIcon className="material-icons" >
                file_upload
              </FontIcon>
            }
          >
            <input type="file" style={imgInputStyles} onChange={this.handleImgUpload.bind(this)} />
          </RaisedButton>
          <RaisedButton
            label="Synthesize"
            secondary={true}
            style={{ marginLeft: '20px' }}
            onMouseDown={this.synthesizeImg.bind(this)}
            icon={
              <FontIcon className="material-icons" >
                transform
              </FontIcon>
            }
          />
          <RaisedButton
            label="Download"
            secondary={true}
            style={{ float: 'right', marginRight: '40px' }}
            onMouseDown={this.downloadCanvas.bind(this)}
            icon={
              <FontIcon className="material-icons" >
                file_download
              </FontIcon>
            }
          />
        </div>
        <div className="footer">
          <small>&copy; Shang-Yu, Su </small>
        </div>
      </div>
    );
  }
}

render(<MainBody />, document.getElementById('root'));
