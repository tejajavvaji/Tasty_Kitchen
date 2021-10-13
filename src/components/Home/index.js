import {Component} from 'react'

import Header from '../Header/index'
import Footer from '../Footer/index'

import './index.css'
import Carousel from '../Carousel'
import Restaurants from '../Restaurants/index'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-main">
          <Carousel />
          <Restaurants />
        </div>

        <Footer />
      </>
    )
  }
}

export default Home
