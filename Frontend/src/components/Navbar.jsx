import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../assetss/assets';
import { Link,useNavigate} from 'react-router-dom';
import { StoreContext } from '../context/storeContext';

function Navbar({ setShowlogin }) {
  const [menu, setMenu] = useState("menu");
  const { getTotalcartamount, token, setToken } = useContext(StoreContext);
  const navigate=useNavigate();
  // Handle logout
  const handleLogout = () => {
    setToken("");                  // Clear context
    localStorage.removeItem("token"); // Clear localStorage
     navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === 'menu' ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="cart" /></Link>
          <div className={getTotalcartamount() === 0 ? "" : "dot"}></div>
        </div>

        {/* Login / Profile */}
        {!token ? (
  <button onClick={() => setShowlogin(true)}>Sign in</button>
) : (
  <div className='navbar-profile'>
    <img src={assets.profile_icon} alt="profile" />
    <ul className="nav-profile-dropdown">
      <li onClick={()=>navigate('/MyOrders')}>
        <img src={assets.bag_icon} alt="orders" />
        <p>Orders</p>
      </li>
      <hr />
      <li onClick={handleLogout}>
        <img src={assets.bag_icon} alt="logout" />
        <p>Logout</p>
      </li>
    </ul>
  </div>
)}

      </div>
    </div>
  );
}

export default Navbar;
