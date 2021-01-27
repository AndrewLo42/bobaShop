import React, { Component } from "react";
import { Table, Container } from "reactstrap";
import { socket } from "../global/header";
import MenuItem from "./components/itemCard";
class Menu extends Component {
  constructor() {
    super();
    this.state = {
      food_data: []
      // this is where we are connecting to with sockets,
    };
  }
  getData = foodItems => {
    console.log(foodItems);
    foodItems = foodItems.map(food => {
      food.order = 0;
      return food;
    });
    this.setState({ food_data: foodItems });
  };
  componentDidMount() {
    socket.emit("initial_data");
    var state_current = this;
    socket.on("get_data", state_current.getData);
  }
  componentWillUnmount() {
    socket.off("get_data", this.getData);
  }
  //Function to place the order.
  sendOrder = id => {
    var order_details;
    this.state.food_data.map(food => {
      if (food._id === id) {
        order_details = food;
      }
      return food;
    });
    console.log(order_details);
    socket.emit("putOrder", order_details);
    var new_array = this.state.food_data.map(food => {
      food.order = 0;
      return food;
    });
    this.setState({ food_data: new_array });
  };
  // Changing the quantity in the state which is emitted to the backend at the time of placing the order.
  changeQuantity = (event, foodid) => {
    // if (parseInt(event.target.value) < 0) {
    //   event.target.value = 0;
    // }
    var new_array = this.state.food_data.map(food => {
      if (food._id === foodid) {
        // food.order = parseInt(event.target.value);
        food.order++;
        food.total = parseFloat(food.order * food.price).toFixed(2);
      }
      return food;
    });
    this.setState({ food_data: new_array });
  };
  // To get the initial data
  getMenuItems() {
    return this.state.food_data.map(food => {
      let foodTotal = 0.00;
      if (food.total) {
        foodTotal = food.total
      }
      return (
        <MenuItem key={food._id} food={food} changeQuantity={this.changeQuantity}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <h2 className="h2Class text-center">Order Menu</h2>
        {this.getMenuItems()}
        <h2>Cart</h2>
        <div>Foods</div>
      </Container>
    );
  }
}
export default Menu;
