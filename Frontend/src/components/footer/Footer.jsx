import React from 'react'
import "./footer.css"
import { assets } from '../../assetss/assets'

function Footer() {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
         <div className="footer-content-left">
            <img src={assets.logo}/>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam deleniti omnis voluptatum nemo recusandae similique, ratione animi doloremque id sed neque rerum excepturi, temporibus cum quia aliquam, distinctio veniam totam.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon}/>
                <img src={assets.twitter_icon}/>
                <img src={assets.linkedin_icon}/>
            </div>

         </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>

        </div>
         <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@tomato.com</li>
            </ul>

         </div>
        </div> 
        <hr/>
        <p className='footer-copyright'>copyright 2025 © Tomato.com -All Right Reserved.

        </p>

    </div>
  )
}

export default Footer