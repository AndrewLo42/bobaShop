import React from 'react';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

  }

  addItemToCart() {

  }


  renderPrice() {
    const convertedPrice = (this.props.food.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  render() {
    return (
      <div className="card item-card col-lg-3 col-md-5 col-sm-6 col-xs-12  m-2 shadow-sm" >
        <div >
          <img className="card-img-top card-img pt-1"  ></img>
          <div className="card-body">
            <h2 className="card-title">{this.props.food.name}</h2>
            <div className="card-price text-muted">${this.props.food.price}</div>
          </div>
          <div className="overlay">
          </div>
        </div>

        <div className="card-text ">
          {/* <p className="mt-1" onClick={this.setProductView}>{this.props.product.shortDescription}</p> */}
          <div className="row justify-content-around">
            {/* <button className="mt-2 btn btn-primary" onClick={this.setProductView}>Details</button>
            <button className="mt-2 btn btn-secondary add-btn" onClick={this.addItemToCart}>Quick Add</button> */}
          </div>
        </div>

      </div>
    );
  }
}

export default MenuItem;
