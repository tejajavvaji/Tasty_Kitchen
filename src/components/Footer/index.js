import {AiFillFacebook} from 'react-icons/ai'
import {FaPinterestSquare, FaInstagram, FaTwitter} from 'react-icons/fa'
import './index.css'
import logo from '../../Resources/Footer/websiteLogoFooter.svg'

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo-container">
      <img src={logo} alt="" />
      <p className="footer-website-name">Tasty Kitchens</p>
    </div>
    <p>The only thing we are serious about is food.</p>
    <div className="footer-icons-container">
      <FaPinterestSquare className="footer-icon" />
      <FaInstagram className="footer-icon" />
      <FaTwitter className="footer-icon" />
      <AiFillFacebook className="footer-icon" />
      <h1>Test</h1>
    </div>
  </footer>
)

export default Footer
