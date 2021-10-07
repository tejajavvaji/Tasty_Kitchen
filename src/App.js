import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import {Component} from 'react'

import CartContext from './Context/CartContext'
import Login from './components/Login/index'
import Home from './components/Home/index'
import Cart from './components/Cart/index'
import ProtectedRoute from './components/ProtectedRoute'
import EachRestaurant from './components/EachRestaurant'
import NotFound from './components/NotFound/NotFound'
import './App.css'

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]
class App extends Component {
  state = {cartData: []}

  componentDidMount = () => {
    const data = localStorage.getItem('cart')
    console.log(data)
  }

  addProductToCart = product => {
    this.setState(prevState => ({cartData: [...prevState.cartData, product]}))
  }

  increaseItemQuantity = id => {
    const {cartData} = this.state
    const newData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    this.setState({cartData: newData}, this.updateLocalStorage())
  }

  decreaseItemQuantity = id => {
    const {cartData} = this.state
    const newData = cartData.map(eachItem => {
      if (eachItem.id === id && eachItem.quantity > 1) {
        return {...eachItem, quantity: eachItem.quantity - 1}
      }
      return eachItem
    })
    this.setState({cartData: newData}, this.updateLocalStorage())
  }

  deleteProductInCart = id => {
    const {cartData} = this.state
    const newData = cartData.filter(eachItem => eachItem.id !== id)
    this.setState({cartData: newData}, this.updateLocalStorage())
  }

  updateLocalStorage = () => {
    const {cartData} = this.state
    localStorage.setItem('cart', cartData)
  }

  render() {
    const {cartData} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartData,
            addProductToCart: this.addProductToCart,
            increaseItemQuantity: this.increaseItemQuantity,
            decreaseItemQuantity: this.decreaseItemQuantity,
            deleteProductInCart: this.deleteProductInCart,
          }}
        >
          <Switch>
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={EachRestaurant}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
