import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import logo from '../../Resources/Login/login logo.svg'
import bannerImage from '../../Resources/Login/loginBannerSM-SVG.svg'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  componentDidMount() {
    this.checkToken()
  }

  checkToken = () => {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  authUser = async event => {
    event.preventDefault()
    this.setState({errorMsg: ''})
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const token = data.jwt_token
      Cookies.set('jwt_token', token, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-main">
        <div className="form-container">
          <div className="login-card">
            <div className="login-logo-container">
              <img src={logo} alt="website logo" />
              <h1 className="login-website-name">Tasty Kitchens</h1>
            </div>

            <form className="login-form" onSubmit={this.authUser}>
              <h1 className="login-name">Login</h1>
              <label className="login-username-label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="login-username-input"
                type="text"
                value={username}
                onChange={this.updateUsername}
                id="username"
              />
              <label className="login-password-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="login-password-input"
                type="password"
                value={password}
                onChange={this.updatePassword}
                id="password"
              />
              <p className="error-msg">{errorMsg}</p>
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="banner-container">
          <img
            className="login-banner-image"
            src={bannerImage}
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default Login
