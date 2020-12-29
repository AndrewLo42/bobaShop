import React, { Component } from "react";
import {Container} from "reactstrap";
import { socket } from "../../header/header";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      currentQty: '0'
      // this is where we are connecting to with sockets,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let intReg = /^\d+$/;
    if(event.target.name === "name"){
      this.setState({name: event.target.value})
    } else if(event.target.name === "currentQty" && intReg.test(event.target.value)) {
      this.setState({currentQty: event.target.value})
    }
  }

  handleNewItem(){
    let predicted_details = this.state;
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
          <input value={this.state.currentQty} name="currentQty" onChange={this.handleChange} autoComplete="off"></input>
          <button className="submit-button mt-5">Add Item</button>
        </div>
      </Container>
    )
  }
}

export default AddItem;
