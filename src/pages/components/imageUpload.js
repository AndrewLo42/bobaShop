import React, {Component, useState} from 'react';
import { socket } from "../../global/header";
// import PlaceHolderImage from '../images/placeholder-image-square.jpg';

export default class UploadForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictureBlob: "",
      currentPicture: ""
    };
    this.previewFile = this.previewFile.bind(this);

    this.updateImage = this.updateImage.bind(this);
  }

  handleSubmit() {
    if(!this.state.currentPicture) {
      return;
    }
    document.querySelector('#ImagePreview').src = "../images/placeholder-image-square.jpg";
    socket.emit("UploadImage", this.state.currentPicture.replace(/^data:image\/(png|jpg);base64,/, ""));
    this.setState({currentPicture: ""});
    // this.props.uploadPicture(this.state.currentPicture)
  }

  updateImage(imgData) {
    this.setState({
      currentPicture: imgData
    })
  }

  previewFile() {
    const preview = document.querySelector('#ImagePreview');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend",  () => {
      preview.src = reader.result.toString();
      this.setState({currentPicture: reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")})
    }, false);

    if (file) {
      this.setState({
        pictureBlob: URL.createObjectURL(file)
      })
      // reader.readAsDataURL(file);
    }
  }

  render() {
    return(
      <div className="half-container mt-4">
        <div className="upload-form column">
          <div className="form-container column">
            <h1 className="text-center">Upload Image</h1>
            <input type="file" name="file" id="file" onChange={this.previewFile} className="image-input"></input>
            <label className="submit-button" htmlFor="file">Choose a file</label>
            <img src="../images/placeholder-image-square.jpg" className="preview-image" alt="Image preview" id="ImagePreview"></img>
            <div className="submit-button" onClick={() => this.handleSubmit()}>Upload Image</div>
          </div>
        </div>
      </div>
    )
  }
}
