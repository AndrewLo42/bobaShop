import React, { Component } from 'react';

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.completeOrder = this.completeOrder.bind(this);
  }

  completeOrder(orderItem, id) {
    for(let i = 0; i < orderItem.length; i++){
      if(orderItem[i].order > 0) {
        this.props.sendOrder(orderItem[i]);
      }
      if(i === orderItem.length-1) {
        this.props.finishOrder(id)
      }
    }
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
          <button onClick={() => this.completeOrder(this.props.orderInfo, this.props.orderDbId)} className="mt-5">Complete Order</button>
        </span>
      </div>
    )
  }
}

export default OrderCard;
