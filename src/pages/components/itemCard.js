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
      <div className="card item-card col-lg-4 col-md-5 col-sm-6 col-xs-12 shadow-sm m-2" >
        <div className="text-center">
          {/* <img className="card-img-top card-img pt-1"  ></img> */}
          <div className="card-body">
            <h3 className="card-title">{this.props.food.name}</h3>
            <div className="m-auto w-100 d-flex justify-content-center">
              <img className="card-image" src={this.props.food.image} />
            </div>
            <div className="mt-3 card-price text-muted">${this.props.food.price}</div>
          </div>
          <div className="overlay">
          </div>
        </div>

        <div className="card-text p-4">
          Delicious Drink
          {/* <p className="mt-1" onClick={this.setProductView}>{this.props.product.shortDescription}</p> */}
          <div className="row justify-content-around m-3">
            <button onClick={(e) => this.props.changeQuantity(e, this.props.food._id)}>Add to Order</button>
            {/* <button className="mt-2 btn btn-primary" onClick={this.setProductView}>Details</button>
            <button className="mt-2 btn btn-secondary add-btn" onClick={this.addItemToCart}>Quick Add</button> */}
          </div>
        </div>

      </div>
    );
  }
}

export default MenuItem;
