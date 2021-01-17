import React, { Component } from "react";
import { Table, Container } from "reactstrap";
import { socket } from "../global/header";

import AddItem from './components/addItem';
class UpdateItems extends Component {
  constructor() {
    super();
    this.state = {
      food_data: []
      // this is where we are connecting to with sockets,
    };
    this.refreshData = this.refreshData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  changeData = () => socket.emit("initial_data");
  refreshData() {
    socket.emit("initial_data");
    socket.on("change_data", this.getData);
  }
  updateFood(newFoodArr) {
    this.setState({food_data: newFoodArr});
  }
  sendMenuItem(newMenuItem) {
    socket.emit("AddMenuItem", newMenuItem);
  }

  getData = foodItems => {
    this.setState({ food_data: foodItems });
  };

  componentDidMount() {
    // var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("change_data", this.changeData);
  }

  deleteItem = (id) => {
    socket.emit("DeleteMenuItem", id);
  }

  sendPredQty = id => {
    var predicted_details;
    this.state.food_data.map(food => {
      if (food._id === id) {
        predicted_details = food;
      }
      return food;
    });
    console.log(predicted_details);
    socket.emit("ChangePred", predicted_details);
  };

  changePredQuantity = (event, foodid) => {
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    var new_array = this.state.food_data.map(food => {
      if (food._id === foodid) {
        food.predQty = parseInt(event.target.value);
      }
      return food;
    });
    this.setState({ food_data: new_array });
  };

  componentWillUnmount() {
    socket.off("get_data", this.getData);
  }

  getFoodData() {
    if(!this.state.food_data) {
      return (<div>loading...</div>)
    }
    return this.state.food_data.map(food => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td>
            <input
              onChange={e => this.changePredQuantity(e, food._id)}
              value={food.predQty}
              type="number"
              placeholder="Quantity"
              min="0"
            />
          </td>
          <td>
            <button onClick={() => this.sendPredQty(food._id)}>
              Update Qty
            </button>
          </td>
          <td>
            <button onClick={() => this.deleteItem(food._id)}>
              Remove Item
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Container className="inventory-container">
        <h2 className="h2Class">Update Inventory</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Qty</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{this.getFoodData()}</tbody>
        </Table>
        <div>
          {/* <h4 className="mt-4">Add New Item</h4>
          <button >Add Item</button> */}
          <AddItem food_data={this.state.food_data} refreshData={this.refreshData} changeData={this.changeData} sendMenuItem={this.sendMenuItem}/>
        </div>
      </Container>
    );
  }
}

export default UpdateItems;
