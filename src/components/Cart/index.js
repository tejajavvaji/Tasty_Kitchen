import {Component} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import CartContext from '../../Context/CartContext'
import Header from '../Header/index'
import Footer from '../Footer/index'
import EmptyCartImage from '../../Resources/Cart/EmptyCart.jpg'
import './index.css'

class Cart extends Component {
  redirectToHome = () => {
    const {history} = this.props
    history.push('/')
  }

  renderEmptyCart = () => (
    <>
      <img src={EmptyCartImage} alt="" />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-para">
        Your cart is empty. Add something from the menu.
      </p>
      <button
        onClick={this.redirectToHome}
        className="redirect-btn"
        type="button"
      >
        Order Now
      </button>
    </>
  )

  renderCartData = (
    cartData,
    increaseItemQuantity,
    decreaseItemQuantity,
    deleteProductInCart,
  ) => {
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
          {cartData.map(eachItem =>
            this.renderCartItem(
              eachItem,
              increaseItemQuantity,
              decreaseItemQuantity,
              deleteProductInCart,
            ),
          )}
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

  renderCartItem = (
    eachItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    deleteProductInCart,
  ) => {
    const {quantity} = eachItem
    // const symbol =
    //   quantity > 1 ? '-' : <AiFillDelete style={{fontSize: '40'}} />
    return (
      <li className="cart-list-item">
        <div className="cart-item-image-container">
          <img className="cart-image" src={eachItem.image_url} alt="" />
          <h1 className="cart-item-name">{eachItem.name}</h1>
        </div>
        <div className="cart-item-quantity">
          {quantity > 1 ? (
            <button
              className="counterBtn m1"
              type="button"
              onClick={() => decreaseItemQuantity(eachItem.id)}
            >
              -
            </button>
          ) : (
            <button
              onClick={() => deleteProductInCart(eachItem.id)}
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
            onClick={() => increaseItemQuantity(eachItem.id)}
          >
            +
          </button>
        </div>
        <p className="cart-item-price">₹ {eachItem.cost}.00</p>
      </li>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartData,
            increaseItemQuantity,
            decreaseItemQuantity,
            deleteProductInCart,
          } = value

          return (
            <>
              <Header />
              <div className="cart-main">
                <div className="cart-content">
                  {cartData.length > 0
                    ? this.renderCartData(
                        cartData,
                        increaseItemQuantity,
                        decreaseItemQuantity,
                        deleteProductInCart,
                      )
                    : this.renderEmptyCart()}
                </div>
              </div>
              <Footer />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
