import React, { Component } from "react";
import {Container} from "reactstrap";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      currentQty: ''
      // this is where we are connecting to with sockets,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  render() {
    return(
      <Container className="mt-5">
        <h4 className="text-center">New Menu Item</h4>
        <div className="form-container">
          <label>Item Name</label>
          <input value={this.state.name} name="name" onChange={this.handleChange}></input>
          <label>Item Quantity</label>
          <input></input>
        </div>
      </Container>
    )
  }
}

export default AddItem;
