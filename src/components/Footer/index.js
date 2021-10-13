import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'
import logo from '../../Resources/Footer/websiteLogoFooter.svg'

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo-container">
      <img src={logo} alt="website-footer-logo" />
      <h1 className="footer-website-name">Tasty Kitchens</h1>
    </div>
    <p>The only thing we are serious about is food. Contact us on</p>
    <div className="footer-icons-container">
      <FaPinterestSquare
        className="footer-icon"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram
        className="footer-icon"
        data-testid="instagram-social-icon"
      />
      <FaTwitter className="footer-icon" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        className="footer-icon"
        data-testid="facebook-social-icon"
      />
    </div>
  </footer>
)

export default Footer
