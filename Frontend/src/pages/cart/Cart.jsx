import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { cartItems, food_list, removeFromcart,getTotalcartamount,url } = useContext(StoreContext)
  const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((items, index) => {
          if (cartItems[items._id] > 0) {
            return (
              <div key={items._id}>
                <div className="cart-items-title  cart-items-item">
                  <img src={url+"/images/"+items.image}></img>
                  <p>{items.name}</p>
                  <p>${items.price}</p>
                  <p>{cartItems[items._id]}</p>
                  <p>${items.price * cartItems[items._id]}</p>
                  <p onClick={() => removeFromcart(items._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )

          }

        })}

      </div>
      <div className="cart-bottom">
        
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalcartamount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalcartamount()===0?0:getTotalcartamount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input type='text' placeholder='Promo code'/>
              <button>Submit</button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart