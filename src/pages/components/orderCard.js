import React, { Component } from 'react';

class OrderCard extends Component {
  constructor(props) {
    super(props);

  }

  listOrders() {
    return this.props.orderInfo.map(order => {
      if(order.order > 0){
        return(
          <div className="container" key={order._id}>
            <div className="row px-5 mx-5 mt-3">
              <span className="col">{order.name}</span>
              <span className="col">{order.order}</span>
            </div>
          </div>
        );
      }
    })
  }

  render() {
    return(
      <div className="orders-card">
        <span className="row justify-content-center">
          <div className="order-title">Order Number:</div>
          <div>{this.props.orderId}</div>
          {this.listOrders()}
          <button className="mt-5">Complete Order</button>
        </span>
      </div>
    )
  }
}

export default OrderCard;
