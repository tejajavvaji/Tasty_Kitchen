import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

class EachFoodItem extends Component {
  state = {showCounter: false, quantity: 0}

  addItem = () => {
    this.setState({showCounter: true, quantity: 1})
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState({quantity: quantity - 1})
    } else {
      this.setState({showCounter: false})
    }
  }

  renderCounter = () => {
    const {quantity} = this.state
    return (
      <div className="counter-main">
        <button
          className="counterBtn m1"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <div className="counter-quantity">{quantity}</div>
        <button
          className="counterBtn m2"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }

  render() {
    const {data} = this.props
    const {showCounter, quantity} = this.state
    return (
      <li className="food-item-list">
        <img className="each-food-image" src={data.image_url} alt="" />
        <div className="each-food-details">
          <h1 className="each-food-heading">{data.name}</h1>
          <p className="each-food-cost">₹ {data.cost}</p>
          <div className="star-container">
            <AiFillStar className="item-star" />
            <p className="each-rating">{data.rating}</p>
          </div>
          {showCounter ? (
            this.renderCounter()
          ) : (
            <button
              onClick={this.addItem}
              className="each-food-addBtn"
              type="button"
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default EachFoodItem
