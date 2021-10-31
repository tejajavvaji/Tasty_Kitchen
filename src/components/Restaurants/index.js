import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSort} from 'react-icons/md'
import {TiArrowSortedDown, TiTick} from 'react-icons/ti'
import {AiOutlineCaretLeft, AiFillCaretRight} from 'react-icons/ai'
import RestaurantsItem from '../RestaurantsItem/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class Restaurants extends Component {
  state = {
    apiStatusRestaurant: apiStatusConstants.initial,
    activePage: 1,
    maxPage: '',
    restaurantsData: [],
    sortBy: 'Lowest',
    showSort: false,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatusRestaurant: apiStatusConstants.inProgress})
    const {sortBy} = this.state
    const {activePage} = this.state
    const token = Cookies.get('jwt_token')
    const offset = (activePage - 1) * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${sortBy}&offset=${offset}&limit=9`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const maxPages = Math.ceil(data.total / 9)
      this.setState({
        maxPage: maxPages,
        restaurantsData: data.restaurants,
        apiStatusRestaurant: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusRestaurant: apiStatusConstants.failure})
    }
  }

  prevPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantData)
    }
  }

  nextPage = () => {
    const {maxPage, activePage} = this.state
    if (activePage < maxPage) {
      this.setState({activePage: activePage + 1}, this.getRestaurantData)
    }
  }

  updateShowSort = () => {
    this.setState(prevState => ({showSort: !prevState.showSort}))
  }

  updateSortHighest = () => {
    this.setState({sortBy: 'Highest', showSort: false}, this.getRestaurantData)
  }

  updateSortLowest = () => {
    this.setState({sortBy: 'Lowest', showSort: false}, this.getRestaurantData)
  }

  renderSuccess = () => {
    const {activePage, maxPage, restaurantsData, sortBy, showSort} = this.state
    const sortClass = showSort
      ? 'sort-details-container'
      : 'sort-details-container hide'
    const activeHClass =
      sortBy === 'Highest'
        ? 'sort-item-container sort-item-container-active'
        : 'sort-item-container'
    const activeLClass =
      sortBy === 'Lowest'
        ? 'sort-item-container sort-item-container-active'
        : 'sort-item-container'
    return (
      <>
        <div className="home-heading-container">
          <h1 className="home-heading">Popular Restaurants</h1>
          <div className="home-para-container">
            <p>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>

            <div>
              <button
                className="home-sort-container"
                onClick={this.updateShowSort}
                type="button"
              >
                <MdSort className="home-sort-icon" />
                <p className="home-sort-para">
                  Sort By {sortBy} &nbsp; <TiArrowSortedDown />
                </p>
              </button>
            </div>
            <div className={sortClass}>
              <button
                onClick={this.updateSortHighest}
                type="button"
                className={activeHClass}
              >
                <p className="sort-item">Highest</p>
                {sortBy === 'Highest' ? <TiTick /> : null}
              </button>
              <button
                onClick={this.updateSortLowest}
                type="button"
                className={activeLClass}
              >
                <p className="sort-item">Lowest</p>
                {sortBy === 'Lowest' ? <TiTick /> : null}
              </button>
            </div>
          </div>
        </div>
        <ul className="home-restaurants-container">
          {restaurantsData.map(eachRestaurant => (
            <RestaurantsItem data={eachRestaurant} key={eachRestaurant.id} />
          ))}
        </ul>

        <div className="home-pagination-container">
          <button
            onClick={this.prevPage}
            className="pagination-icon-btn"
            type="button"
            testid="pagination-left-button"
          >
            <AiOutlineCaretLeft className="pagination-icons" />
          </button>

          <p>
            {activePage} of {maxPage}
          </p>

          <button
            testid="pagination-right-button"
            onClick={this.nextPage}
            className="pagination-icon-btn"
            type="button"
          >
            <AiFillCaretRight className="pagination-icons" />
          </button>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="carousel-loader-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantData = () => {
    const {apiStatusRestaurant} = this.state
    switch (apiStatusRestaurant) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantData()}</>
  }
}
