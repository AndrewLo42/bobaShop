import React, { Component } from "react";
import { Table, Container } from "reactstrap";
import { socket } from "../global/header";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import OrderCard from "./components/orderCard";
class Kitchen extends Component {
  constructor() {
    super();
    this.state = {
      food_data: [],
      food_orders: []
      // this is where we are connecting to with sockets,
    };
  }

  getData = foodItems => {
    console.log(foodItems);
    this.setState({ food_data: foodItems });
  };

  getOrders = orderList => {
    console.log("orders", orderList)
    this.setState({food_orders: orderList})
  }

  changeData = () => socket.emit("initial_data");
  updateOrders = () => socket.emit("initial_orders");

  componentDidMount() {
    // var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("change_data", this.changeData);

    socket.emit("initial_orders")
    socket.on("get_orders", this.getOrders);
    socket.on("update_orders", this.updateOrders);
  }

  componentWillUnmount() {
    socket.off("get_data");
    socket.off("change_data");
  }

  markDone = (id, qty) => {
    // console.log(predicted_details);
    if(qty){
      socket.emit("mark_done", id);
    }
  };

  sendOrder = (request) => {
    // socket.emit("sendOrder", request);
    // console.log(request)
    socket.emit("completeOrder", request);
  }

  finishOrder = (id) => {
    socket.emit("finishOrder", id);
    // console.log(id)
  }


  getFoodData() {
    return this.state.food_data.map(food => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td> {food.ordQty} </td>
          <td> {food.prodQty} </td>
          <td> {food.predQty} </td>
          <td>
            <button onClick={() => this.markDone(food._id, food.ordQty)}>Done</button>
          </td>
        </tr>
      );
    });
  }

  getOrderCards() {
    return this.state.food_orders.map(customerOrder => {
      return(
        <OrderCard orderInfo={customerOrder.order} orderId={customerOrder._id.substr(customerOrder._id.length - 3)} key={customerOrder._id} orderDbId={customerOrder._id} sendOrder={this.sendOrder} finishOrder={this.finishOrder}/>
      )
    })
  }

  render() {
    return (
      <Container className="page-content">
        <h2 className="h2Class">Kitchen Area</h2>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />

        <Table striped id="table-to-xls">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Orders</th>
              <th>Lifetime Orders</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{this.getFoodData()}</tbody>
        </Table>
        <div className="mt-3 pb-4 text-center">
          <h1>Orders</h1>
          <div>{this.getOrderCards()}</div>
        </div>
      </Container>
    );
  }
}

export default Kitchen;
