import Header from '../Header/index'
import Footer from '../Footer/index'
import image from '../../Resources/NotFound/NotFound.jpg'

import './NotFound.css'

const NotFound = props => {
  const redirectToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <>
      <Header />
      <div className="not-found-container">
        <img src={image} alt="" />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-para">
          We are sorry the page you requested could not be found <br />
          Please go back to Home page
        </p>
        <button
          onClick={redirectToHome}
          className="not-found-btn"
          type="button"
        >
          Home Page
        </button>
      </div>
      <Footer />
    </>
  )
}

export default NotFound
