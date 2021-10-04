import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {MdSort} from 'react-icons/md'
import {AiOutlineCaretLeft, AiFillCaretRight} from 'react-icons/ai'

import Header from '../Header/index'
import Footer from '../Footer/index'
import RestaurantsItem from '../RestaurantsItem/index'
import './index.css'

class Home extends Component {
  state = {imagesData: [], activePage: 1, maxPage: '', restaurantsData: []}

  componentDidMount() {
    this.getSliderImages()
    this.getRestaurantData()
  }

  getSliderImages = async () => {
    const imagesApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(imagesApiUrl, options)
    const data = await response.json()
    this.setState({imagesData: data.offers})
  }

  getRestaurantData = async () => {
    const {activePage} = this.state
    const token = Cookies.get('jwt_token')
    const offset = (activePage - 1) * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const maxPages = Math.ceil(data.total / 9)
    this.setState({maxPage: maxPages})
    this.setState({restaurantsData: data.restaurants})
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
            return <img src={imageUrl} alt="" />
          })}
        </Slider>
      </div>
    )
  }

  prevPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantData)
      //   this.setState(prevState => ({activePage: prevState.activePage - 1}))
    }
  }

  nextPage = () => {
    const {maxPage, activePage} = this.state
    if (activePage < maxPage) {
      this.setState({activePage: activePage + 1}, this.getRestaurantData)
      //   this.setState(prevState => ({activePage: prevState.activePage + 1}))
    }
  }

  render() {
    const {imagesData, activePage, maxPage, restaurantsData} = this.state

    return (
      <>
        <Header />
        <div className="home-main">
          {imagesData.length !== 0 ? <>{this.renderCarouselData()}</> : null}
          <div className="home-heading-container">
            <h1 className="home-heading">Popular Restaurants</h1>
            <div className="home-para-container">
              <p>
                Select your favorite restaurant special dish and make your day
                happy.
              </p>
              <div className="home-sort-container">
                <MdSort className="home-sort-icon" />
                <p>Sort by</p>
              </div>
            </div>
          </div>
          <ul className="home-restaurants-container">
            {restaurantsData.map(eachRestaurant => (
              <RestaurantsItem data={eachRestaurant} />
            ))}
          </ul>

          <div className="home-pagination-container">
            <button
              onClick={this.prevPage}
              className="pagination-icon-btn"
              type="button"
            >
              <AiOutlineCaretLeft className="pagination-icons" />
            </button>

            <p>
              {activePage} of {maxPage}
            </p>

            <button
              onClick={this.nextPage}
              className="pagination-icon-btn"
              type="button"
            >
              <AiFillCaretRight className="pagination-icons" />
            </button>
          </div>
        </div>

        <Footer />
      </>
    )
  }
}

export default Home
