import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'

import CartContext from '../../Context/CartContext'

import './index.css'

class EachFoodItem extends Component {
  state = {showCounter: false, quantity: 0}

  //   componentDidMount() {
  //     console.log('Mount')
  //     this.checkCartData()
  //   }

  onIncrement = sendIncrement => {
    sendIncrement()
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = (sendDecrement, sendDelete) => {
    sendDecrement()
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState({quantity: quantity - 1})
    } else {
      sendDelete()
      this.setState({showCounter: false})
    }
  }

  //   checkCartData = () => {
  //     const app = 'app here'
  //     console.log(app)
  //     return (
  //       <CartContext.Consumer>
  //         {value => {
  //           const {cartData} = value
  //           const {data} = this.state
  //           const {id} = data
  //           console.log(cartData, id)
  //           if (cartData.length > 0) {
  //             cartData.map(eachItem => {
  //               if (eachItem.id === id) {
  //                 this.setState({showCounter: true})
  //                 return null
  //               }
  //               return null
  //             })
  //           }
  //         }}
  //       </CartContext.Consumer>
  //     )
  //   }

  renderCounter = (sendIncrement, sendDecrement, sendDelete) => {
    const {quantity} = this.state
    return (
      <div className="counter-main">
        <button
          testid="decrement-count"
          className="counterBtn m1"
          type="button"
          onClick={() => this.onDecrement(sendDecrement, sendDelete)}
        >
          -
        </button>
        <p testid="active-count" className="counter-quantity">
          {quantity}
        </p>
        <button
          testid="increment-count"
          className="counterBtn m2"
          type="button"
          onClick={() => this.onIncrement(sendIncrement)}
        >
          +
        </button>
      </div>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {data} = this.props
          const {id} = data

          const {
            addProductToCart,
            increaseItemQuantity,
            decreaseItemQuantity,
            deleteProductInCart,
          } = value

          /* this.checkCartData(cartData, id) */

          const {showCounter} = this.state

          const addItem = () => {
            this.setState({showCounter: true, quantity: 1})
            addProductToCart({...data, quantity: 1})
          }

          const sendDelete = () => {
            deleteProductInCart(id)
          }

          const sendDecrement = () => {
            decreaseItemQuantity(id)
          }

          const sendIncrement = () => {
            increaseItemQuantity(id)
          }
          return (
            <li testid="foodItem" className="food-item-list">
              <img className="each-food-image" src={data.image_url} alt="" />
              <div className="each-food-details">
                <h1 className="each-food-heading">{data.name}</h1>
                <p className="each-food-cost">₹ {data.cost}</p>
                <div className="star-container">
                  <AiFillStar className="item-star" />
                  <p className="each-rating">{data.rating}</p>
                </div>
                {showCounter ? (
                  this.renderCounter(sendIncrement, sendDecrement, sendDelete)
                ) : (
                  <button
                    onClick={addItem}
                    className="each-food-addBtn"
                    type="button"
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default EachFoodItem
