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
        testid="pintrest-social-icon"
        className="footer-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="footer-icon" />
      <FaTwitter testid="twitter-social-icon" className="footer-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="footer-icon" />
    </div>
  </footer>
)

export default Footer
