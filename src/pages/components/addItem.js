import React, { Component } from "react";
import {Container} from "reactstrap";
import UploadForm from "./imageUpload";
import { socket } from "../../global/header";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      currentQty: '',
      price: '',
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }
  componentDidMount() {
    socket.on("get_image_link", this.updateImage);
  }

  updateImage(link) {
    console.log("image got")
    this.setState({image: link});
  }

  handleChange(event) {
    let intReg = /^(\d+)?([.]?\d{0,2})?$/;
    if(event.target.name === "name"){
      this.setState({name: event.target.value})
    } else if(event.target.name === "currentQty" && (intReg.test(event.target.value) || event.target.value === "")) {
      if(event.target.value === "." || event.target.value === ""){
        this.setState({currentQty: 0})
      } else {
        this.setState({currentQty: parseFloat(event.target.value)})
      }
    } else if(event.target.name === "price" && (intReg.test(event.target.value) || event.target.value === "")) {
      this.setState({price: event.target.value})
    }
  }

  handleNewItem(event){
    event.preventDefault();
    let predicted_details = {
      name: this.state.name,
      currentQty: parseFloat(this.state.currentQty),
      price: parseFloat(this.state.price),
      image: this.state.image
    };
    this.setState({
      name: '',
      currentQty: '',
      price: '',
      image: ''
    })
    console.log(predicted_details);
    // this.props.changeData();
    // socket.emit("AddMenuItem", predicted_details);
    this.props.sendMenuItem(predicted_details);
  }

  render() {
    return(
      <Container className="mt-5 add-item-container">
        <h4 className="text-center">New Menu Item</h4>
        <div className="form-container">
          <label>Item Name</label>
          <input value={this.state.name} name="name" onChange={this.handleChange} autoComplete="off"></input>
          <label>Item Quantity</label>
          <input value={this.state.currentQty} name="currentQty" onChange={this.handleChange} autoComplete="off"></input>
          <label>Item Price</label>
          <input value={this.state.price} name="price" onChange={this.handleChange} autoComplete="off"></input>
          <UploadForm />
          <button onClick={(event) => {this.handleNewItem(event)}} className="submit-button mt-5">Add Item</button>
        </div>
      </Container>
    )
  }
}

export default AddItem;
