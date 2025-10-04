import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/Placeorder';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Loginpopup from './components/loginpopup/Loginpopup';
import Verify from './pages/verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

function App() {
  const[showlogin,setShowlogin]=useState(false)
  return (
   <>
   {showlogin? <Loginpopup setShowlogin={setShowlogin}/>:<></>}
   <div className='app'>
      <Navbar setShowlogin={setShowlogin}/>
      <Routes>
        <Route path='/'  element={<Home/>}/> 
        <Route path='/cart'  element={<Cart/>}/> 
        <Route path='/order'  element={<PlaceOrder/>}/> 
        <Route path='/verify'  element={<Verify/> }/>
        <Route path='/MyOrders'  element={<MyOrders/>}/>
         

      </Routes>

    </div>
  <Footer/>
    </>
  );
}

export default App;
