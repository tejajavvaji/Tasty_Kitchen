import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'

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

const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/restaurant/:id" component={EachRestaurant} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
