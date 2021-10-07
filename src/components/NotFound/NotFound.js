import {Link} from 'react-router-dom'
import Header from '../Header/index'
import Footer from '../Footer/index'
import image from '../../Resources/NotFound/NotFound.jpg'

import './NotFound.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img src={image} alt="not found" />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button className="not-found-btn" type="button">
          Home Page
        </button>
      </Link>
    </div>
    <Footer />
  </>
)

export default NotFound
