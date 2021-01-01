import React, { Component } from "react";
import {Container} from "reactstrap";
import { socket } from "../../header/header";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      currentQty: '',
      price: ''
      // this is where we are connecting to with sockets,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
  }

  handleChange(event) {
    let intReg = /^\d+$/;
    if(event.target.name === "name"){
      this.setState({name: event.target.value})
    } else if(event.target.name === "currentQty" && (intReg.test(event.target.value) || event.target.value === "")) {
      this.setState({currentQty: event.target.value})
    } else if(event.target.name === "price" && (intReg.test(event.target.value) || event.target.value === "")) {
      this.setState({price: event.target.value})
    }
  }

  handleNewItem(){
    let predicted_details = this.state;
    this.setState({
      name: '',
      currentQty: '',
      price: ''
    })
    console.log(predicted_details);
    socket.emit("AddMenuItem", predicted_details);
  }

  render() {
    return(
      <Container className="mt-5">
        <h4 className="text-center">New Menu Item</h4>
        <div className="form-container">
          <label>Item Name</label>
          <input value={this.state.name} name="name" onChange={this.handleChange} autoComplete="off"></input>
          <label>Item Quantity</label>
          <input value={this.state.price} name="price" onChange={this.handleChange} autoComplete="off"></input>
          <label>Item Price</label>
          <input value={this.state.price} name="price" onChange={this.handleChange} autoComplete="off"></input>
          <button onClick={this.handleNewItem} className="submit-button mt-5">Add Item</button>
        </div>
      </Container>
    )
  }
}

export default AddItem;
