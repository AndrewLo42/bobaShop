import React, { Component } from "react";
import { Table, Container } from "reactstrap";
import { socket } from "../global/header";
import MenuItem from "./components/itemCard";
class Menu extends Component {
  constructor() {
    super();
    this.state = {
      food_data: [],
      total: 0,
      orders: [],
      orderAddOns: []

    };
    this.sendOrder = this.sendOrder.bind(this);
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
    let state_current = this;
    socket.on("get_data", state_current.getData);
  }
  componentWillUnmount() {
    socket.off("get_data", this.getData);
  }
  //Function to place the order.
  sendOrder = () => {
    let order_details = this.state.food_data;
    if(!this.state.total) {
      console.log('no orders')
      return;
    }
    // console.log(order_details)
    this.state.food_data.map(food => {
      console.log(food)
    })
    socket.emit("sendOrder", order_details);
    this.getData(this.state.food_data)
    this.setState({total: 0})
  }

  //function to add to cart
  addToCart = foodid => {
    let updatedOrder = [...this.state.order];
    this.state.food_data.map(food => {
      if (food._id === foodid) {
        updatedOrder.push(food)
      }
    });
  }
  // Changing the quantity in the state which is emitted to the backend at the time of placing the order.
  changeQuantity = (event, foodid, food_adds) => {
    // if (parseInt(event.target.value) < 0) {
    //   event.target.value = 0;
    // }
    let new_array = this.state.food_data.map(food => {
      if (food._id === foodid) {
        // food.order = parseInt(event.target.value);
        food.order++;
        food.total = parseFloat(food.order * food.price).toFixed(2);
        this.setState({total: (this.state.total+food.price)})
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
  getFoodOrders() {
    return this.state.food_data.map(food => {
      if(food.order){
        return (
          <div key={food._id} className="d-flex justify-content-center">
            <span className="mx-4 col-sm ">
              {food.order}
            </span>
            <span className="mx-5 col-sm text-center">
              {food.name}
            </span>
            <span className="mx-4 col-sm ">
              {food.total}
            </span>
          </div>
        );
      }
    });
  }

  getTotalPrice() {
    return parseFloat(this.state.total).toFixed(2);
  }

  render() {
    return (
      <Container className="page-content">
        <h2 className="h2Class text-center">Order Menu</h2>
        <div className="d-flex justify-content-center menu-container">
          {this.getMenuItems()}
        </div>
        <div className="card-container">
          <div className="text-center">
            <h2>Cart</h2>
            {this.getFoodOrders()}
            <h3 className="mt-3" >Total</h3>
            ${this.getTotalPrice()}
          </div>
          <Container className="d-flex justify-content-center pt-4">
            <button onClick={this.sendOrder}>Complete Order</button>
          </Container>
        </div>
      </Container>
    );
  }
}
export default Menu;
