import {Component} from 'react'
import Header from '../Header/index'
import Footer from '../Footer/index'
import './index.css'

class EachRestaurant extends Component {
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const {match} = this.props
    const {path} = match
    console.log(path)
    // const apiUrl = 'https://apis.ccbp.in/restaurants-list/${restrauntId}'
  }

  render() {
    return (
      <>
        <Header />
        <div className="each-image-back">
          <div className="maxWidth">
            <div className="each-image-back-left">
              <h1>test</h1>
            </div>
            <div className="each-image-back-right">
              <h1>test</h1>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default EachRestaurant
