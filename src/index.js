import React from 'react';
import { render } from 'react-dom';
import Dropzone from 'react-dropzone';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const initialState = {

};

class MainBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onDrop(files) {
    console.log('Received files: ', files);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

render(<MainBody />, document.getElementById('root'));
