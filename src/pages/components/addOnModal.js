import React, { Component } from 'react';

class AddOns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetness: 100,
      boba: true,
      ice: 100
    }
  }

  render() {
    return(
      <div className="add-modal p-2" >
        <div className="" >
          <h4 className="modal-title">Drink Options</h4>
          <div><b>Sweetness</b></div>
          <div>
            <div className={`select-button ${this.state.sweetness === 100 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({sweetness: 100})}>100%</div>
            <div className={`select-button ${this.state.sweetness === 50 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({sweetness: 50})}>50%</div>
            <div className={`select-button ${this.state.sweetness === 25 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({sweetness: 25})}>25%</div>
            <div className={`select-button ${this.state.sweetness === 0 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({sweetness: 0})}>0%</div>
          </div>
          <div><b>Boba</b></div>
          <div>
            <div className={`select-button ${this.state.boba === true ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({boba: true})}>Yes</div>
            <div className={`select-button ${this.state.boba === false ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({boba: false})}>No</div>
          </div>
          <div><b>Ice Levels</b></div>
          <div>
            <div className={`select-button ${this.state.ice === 100 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({ice: 100})}>100%</div>
            <div className={`select-button ${this.state.ice === 50 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({ice: 50})}>50%</div>
            <div className={`select-button ${this.state.ice === 25 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({ice: 25})}>25%</div>
            <div className={`select-button ${this.state.ice === 0 ? 'option-selected' : 'option-unselected'}`} onClick={()=>this.setState({ice: 0})}>0%</div>
          </div>
          <div className="d-flex justify-content-center my-2">
            <button onClick={(e) => this.props.submitOrder(e, this.props.food_id, this.state)}>Add to Order</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddOns;
