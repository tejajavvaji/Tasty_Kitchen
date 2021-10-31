import {Component} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import CartContext from '../../Context/CartContext'
import Header from '../Header/index'
import Footer from '../Footer/index'
import EmptyCartImage from '../../Resources/Cart/EmptyCart.jpg'
import './index.css'

class Cart extends Component {
  //   redirectToHome = () => {
  //     const {history} = this.props
  //     history.push('/')
  //   }
  state = {none: null}

  renderEmptyCart = () => (
    <>
      <img src={EmptyCartImage} alt="empty cart" />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button className="redirect-btn" type="button">
          Order Now
        </button>
      </Link>
    </>
  )

  renderCartData = cartData => {
    let totalAmount = 0
    cartData.map(eachItem => {
      const itemTotal =
        parseInt(eachItem.cost, 10) * parseInt(eachItem.quantity, 10)
      totalAmount += itemTotal
      return null
    })
    return (
      <div className="cart-data-container">
        <div className="cart-heading-container">
          <p className="cart-list-heading">Item</p>
          <p className="cart-list-quantity">Quantity</p>
          <p className="cart-list-price">Price</p>
        </div>
        <ul className="cart-list">
          {cartData.map(eachItem => this.renderCartItem(eachItem))}
        </ul>
        <hr className="cart-rule" />
        <div className="order-total-container">
          <h1 className="order-total-heading">Order Total:</h1>
          <img className="dummy" src="" alt="" />
          <div className="order-total-price-container">
            <h1 className="order-total-price">₹ {totalAmount}.00</h1>
            <button className="order-total-button" type="button">
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  quantityUpdateLocalStorage = () => {
    const localData = JSON.parse(localStorage.getItem('CartData'))
    const {data} = this.props
    const updatedData = localData.map(eachItem => {
      if (eachItem.id === data.id) {
        const {quantity} = this.state
        return {
          cost: eachItem.cost,
          food_type: eachItem.food_type,
          id: eachItem.id,
          image_url: eachItem.image_url,
          name: eachItem.name,
          quantity,
          rating: eachItem.rating,
        }
      }
      return eachItem
    })
    localStorage.setItem('CartData', JSON.stringify(updatedData))
  }

  deleteItemLocalStorage = id => {
    const localData = JSON.parse(localStorage.getItem('CartData'))
    const updatedData = localData.filter(eachItem => eachItem.id !== id)
    if (updatedData.length === 0) {
      localStorage.removeItem('CartData')
    } else {
      localStorage.setItem('CartData', JSON.stringify(updatedData))
    }
    this.setState({none: null})
  }

  itemQuantityIncrement = id => {
    const localData = JSON.parse(localStorage.getItem('CartData'))
    const updatedData = localData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const newQuantity = parseInt(eachItem.quantity, 10) + 1
        console.log(newQuantity)
        return {
          cost: eachItem.cost,
          food_type: eachItem.food_type,
          id: eachItem.id,
          image_url: eachItem.image_url,
          name: eachItem.name,
          quantity: newQuantity,
          rating: eachItem.rating,
        }
      }
      return eachItem
    })
    localStorage.setItem('CartData', JSON.stringify(updatedData))
    this.setState({none: null})
  }

  itemQuantityDecrement = id => {
    const localData = JSON.parse(localStorage.getItem('CartData'))
    const updatedData = localData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const newQuantity = parseInt(eachItem.quantity, 10) - 1
        console.log(newQuantity)
        return {
          cost: eachItem.cost,
          food_type: eachItem.food_type,
          id: eachItem.id,
          image_url: eachItem.image_url,
          name: eachItem.name,
          quantity: newQuantity,
          rating: eachItem.rating,
        }
      }
      return eachItem
    })
    localStorage.setItem('CartData', JSON.stringify(updatedData))
    this.setState({none: null})
  }

  renderCartItem = eachItem => {
    const {quantity} = eachItem
    // const symbol =
    //   quantity > 1 ? '-' : <AiFillDelete style={{fontSize: '40'}} />
    return (
      <li key={eachItem.id} className="cart-list-item">
        <div className="cart-item-image-container">
          <img className="cart-image" src={eachItem.image_url} alt="" />
          <h1 className="cart-item-name">{eachItem.name}</h1>
        </div>
        <div className="cart-item-quantity">
          {quantity > 1 ? (
            <button
              className="counterBtn m1"
              type="button"
              onClick={() => this.itemQuantityDecrement(eachItem.id)}
            >
              -
            </button>
          ) : (
            <button
              onClick={() => this.deleteItemLocalStorage(eachItem.id)}
              className="cart-delete-btn"
              type="button"
            >
              <AiFillDelete />
            </button>
          )}

          <p className="cart-item-para">{eachItem.quantity}</p>
          <button
            className="counterBtn m2"
            type="button"
            onClick={() => this.itemQuantityIncrement(eachItem.id)}
          >
            +
          </button>
        </div>
        <p className="cart-item-price">₹ {eachItem.cost}.00</p>
      </li>
    )
  }

  render() {
    const cartData = JSON.parse(localStorage.getItem('CartData'))
    return (
      <>
        <Header />
        <div className="cart-main">
          <div className="cart-content">
            {cartData !== null
              ? this.renderCartData(cartData)
              : this.renderEmptyCart()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Cart
