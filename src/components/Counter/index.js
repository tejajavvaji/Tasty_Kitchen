import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {quantity} = this.props
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
}

export default Counter
