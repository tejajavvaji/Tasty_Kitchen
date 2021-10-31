import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

class RestaurantsItem extends Component {
  render() {
    const {data} = this.props
    console.log(data)
    const {name, cuisine, id} = data

    const imageUrl = data.image_url
    const {rating} = data.user_rating
    const ratingColor = data.user_rating.rating_color
    console.log(ratingColor)
    return (
      <Link className="nav-link" to={`/restaurant/${id}`}>
        <li testid="restaurant-item" className="item-card" key={id}>
          <img className="item-image" src={imageUrl} alt="" />
          <div className="item-info">
            <h1 className="item-name">{name}</h1>
            <p className="item-cuisine">{cuisine}</p>
            <div className="item-rating-container">
              <AiFillStar className="item-star" />
              <p style={{color: `${ratingColor}`}} className="item-rating-para">
                {rating}
              </p>
            </div>
          </div>
        </li>
      </Link>
    )
  }
}

export default RestaurantsItem
