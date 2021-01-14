import React, {Component, useState} from 'react';
// import PlaceHolderImage from '../images/placeholder-image-square.jpg';

export default class UploadForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictureBlob: "",
      currentPicture: ""
    };
    this.previewFile = this.previewFile.bind(this);
  }

  handleSubmit() {
    if(!this.state.currentPicture) {
      return;
    }
    document.querySelector('#ImagePreview').src = "../images/placeholder-image-square.jpg";
    this.setState({currentPicture: ""});
    this.props.uploadPicture(this.state.currentPicture)
  }

  previewFile() {
    const preview = document.querySelector('#ImagePreview');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result.toString();
    }, false);

    if (file) {
      this.setState({
        pictureBlob: URL.createObjectURL(file),
        currentPicture: btoa((file))
      })
      reader.readAsDataURL(file);
    }
  }

  render() {
    return(
      <div className="half-container">
        <div className="upload-form column">
          <div className="form-container column">
            <h1>Upload Image</h1>
            <input type="file" name="file" id="file" onChange={this.previewFile} className="image-input"></input>
            <label className="submit-button" htmlFor="file">Choose a file</label>
            <img src="../images/placeholder-image-square.jpg" className="preview-image" alt="Image preview" id="ImagePreview"></img>
            <div className="submit-button" onClick={() => this.handleSubmit()}>Submit</div>
          </div>
        </div>
      </div>
    )
  }
}
