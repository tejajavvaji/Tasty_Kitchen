import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Carousel extends Component {
  state = {imagesData: [], apiStatusCarousel: apiStatusConstants.initial}

  componentDidMount() {
    this.getSliderImages()
  }

  getSliderImages = async () => {
    this.setState({apiStatusCarousel: apiStatusConstants.inProgress})
    const imagesApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(imagesApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        imagesData: data.offers,
        apiStatusCarousel: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusCarousel: apiStatusConstants.failure})
    }
  }

  renderCarouselData = () => {
    const {imagesData} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      vertical: true,
      verticalSwiping: true,
    }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {imagesData.map(eachImage => {
            const imageUrl = eachImage.image_url
            return <img src={imageUrl} alt="offer" />
          })}
        </Slider>
      </div>
    )
  }

  renderCarouselLoader = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="carousel-loader-container"
    >
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderCarousel = () => {
    const {apiStatusCarousel} = this.state
    switch (apiStatusCarousel) {
      case apiStatusConstants.success:
        return this.renderCarouselData()
      case apiStatusConstants.inProgress:
        return this.renderCarouselLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderCarousel()}</>
  }
}

export default Carousel
