import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import logo from '../../Resources/Login/login logo.svg'
import './index.css'

class Header extends Component {
  state = {activePage: 'HOME'}

  componentDidMount() {
    this.checkPath()
  }

  checkPath = () => {
    const {match} = this.props
    console.log(match)
    const {path} = match
    this.setState({activePage: path})
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  changeHome = () => {
    this.setState({activePage: 'HOME'})
  }

  changeCart = () => {
    this.setState({activePage: 'CART'})
  }

  render() {
    let homeClass = ''
    let cartClass = ''
    const {activePage} = this.state
    console.log(activePage)
    if (activePage === '/') {
      homeClass = 'header-home-link active'
    } else {
      homeClass = 'header-home-link'
    }
    if (activePage === '/cart') {
      cartClass = 'header-home-link active'
    } else {
      cartClass = 'header-home-link'
    }
    return (
      <div className="header-main">
        <nav className="header-navbar">
          <Link className="nav-link" to="/">
            <div className="header-logo-container">
              <img src={logo} alt="" />
              <h1 className="header-website-name">Tasty Kitchens</h1>
            </div>
          </Link>

          <div className="header-links-container">
            <Link className="nav-link" to="/">
              <p className={homeClass}>Home</p>
            </Link>
            <Link className="nav-link" to="/cart">
              <p className={cartClass}>Cart</p>
            </Link>
            <button
              onClick={this.logout}
              className="logout-button"
              type="button"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
