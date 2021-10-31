import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {RiUser3Line} from 'react-icons/ri'

import logo from '../../Resources/Login/login logo.svg'
import './index.css'

class Header extends Component {
  state = {activePage: 'HOME', userName: '', count: 0}

  componentDidMount() {
    this.checkPath()
    this.getUserData()
    this.getCount()
  }

  getCount = () => {
    const localData = JSON.parse(localStorage.getItem('CartData'))
    if (localData !== null) {
      this.setState({count: localData.length})
    }
  }

  checkPath = () => {
    const {match} = this.props
    const {path} = match
    this.setState({activePage: path})
  }

  getUserData = async () => {
    const token = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({userName: data.profile_details.name})
    }
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
    const {userName, count} = this.state
    const fullName = userName.split(' ')
    const firstName = fullName[0]
    let homeClass = ''
    let cartClass = ''
    const {activePage} = this.state
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
              <img src={logo} alt="website logo" />
              <h1 className="header-website-name">Tasty Kitchens</h1>
            </div>
          </Link>

          <div className="header-links-container">
            <Link className="nav-link" to="/">
              <p className={homeClass}>Home</p>
            </Link>
            <Link className="nav-link cart-count-link" to="/cart">
              <p className={cartClass}>Cart</p>
              <ul className="cart-count-list">
                <li className="cart-count-list-item">
                  <p className="cart-count">{count}</p>
                </li>
              </ul>
            </Link>
            <Link className="nav-link profile" to="/profile">
              <RiUser3Line />
              <p>{firstName}</p>
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
