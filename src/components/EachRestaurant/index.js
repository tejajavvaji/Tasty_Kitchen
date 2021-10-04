import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Footer from '../Footer/index'
import EachFoodItem from '../EachFoodItem/index'
import './index.css'

class EachRestaurant extends Component {
  state = {restaurantDetails: [], eachFoodItem: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }

    this.setState({
      restaurantDetails: updatedData,
      eachFoodItem: updatedData.foodItems,
    })
  }

  render() {
    const {restaurantDetails, eachFoodItem} = this.state
    let reviews = Math.floor(restaurantDetails.reviewsCount / 50)
    reviews *= 50
    console.log(reviews)
    return (
      <>
        <Header />
        <div className="each-image-back">
          <div className="maxWidth">
            <div className="each-image-back-left">
              <img
                className="restaurant_image"
                src={restaurantDetails.imageUrl}
                alt=""
              />
            </div>
            <div className="each-image-back-right">
              <h1 className="each-name">{restaurantDetails.name}</h1>
              <p className="each-cuisine">{restaurantDetails.cuisine}</p>
              <p className="each-location">{restaurantDetails.location}</p>
              <div className="restaurant-details-container">
                <div className="for-border">
                  <div className="star-container">
                    <AiFillStar className="item-star" />
                    <p className="each-rating">{restaurantDetails.rating}</p>
                  </div>
                  <p className="each-review">{reviews}+ Ratings</p>
                </div>
                <div className="each-cost-container">
                  <p className="each-cost">₹ {restaurantDetails.costForTwo}</p>
                  <p className="each-cost-title">Cost for Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="each-food-item-con">
          <ul className="each-food-item-list">
            {eachFoodItem.length !== 0 ? (
              <>
                {eachFoodItem.map(eachFood => (
                  <EachFoodItem data={eachFood} />
                ))}
              </>
            ) : null}
          </ul>
        </div>

        <Footer />
      </>
    )
  }
}

export default EachRestaurant
