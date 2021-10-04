import {Component} from 'react'
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
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
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

  render() {
    return (
      <>
        <Header />
        <div className="cart-main">
          <div className="cart-content">{this.renderEmptyCart()}</div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Cart
