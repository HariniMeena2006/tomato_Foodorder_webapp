import React, { useContext, useState } from "react";
import axios from "axios";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Placeorder() {
  const { getTotalcartamount, cartItems, food_list, token, url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Build order items
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    const subtotal = getTotalcartamount();
    const delivery = subtotal === 0 ? 0 : 2;
    const amount = subtotal + delivery;
    if (amount <= 0) return alert("Your cart is empty");

    try {
      // 1️⃣ Create Razorpay order on backend (place)
      const { data: create } = await axios.post(
        `${url}/api/order/place`,
        { items: orderItems, address: data, amount },
        { headers: { token } }
      );

      if (!create?.orderId || !create?.key || !create?.amount)
        return alert(create?.message || "Failed to create order");

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: create.key,
        amount: create.amount.toString(),
        currency: "INR",
        name: "Tomato",
        description: "Order Payment",
        order_id: create.orderId,
        prefill: {
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email || "",
          contact: data.phone || "",
        },
        notes: {
          customer_name: `${data.firstName} ${data.lastName}`.trim(),
          customer_email: data.email || "",
          customer_phone: data.phone || "",
        },
        theme: { color: "#F37254" },
        modal: {
          ondismiss: function () {
            // Navigate to failure page when user closes the modal
            navigate("/verify?success=false");
          },
        },
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment on backend (verify)
            const { data: verify } = await axios.post(
              `${url}/api/order/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: orderItems,
                amount,
                address: data,
              },
              { headers: { token } }
            );

            if (verify?.success) {
              setCartItems({});
              navigate(`/verify?success=true&orderId=${verify.orderId || ""}`);
            } else {
              navigate("/verify?success=false");
            }
          } catch (err) {
            console.error("Verification error:", err);
            navigate("/verify?success=false");
          }
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response?.error || response);
        navigate("/verify?success=false");
      });

      rzp.open();
    } catch (err) {
      console.error("Payment creation error:", err);
      alert("Error creating payment. Please try again.");
    }
  };
 useEffect(()=>{
    if(!token||getTotalcartamount()===0){
      navigate('/cart');
    }},[token])

  return (
    <form className="placeorder" onSubmit={placeOrder}>
      {/* Delivery Form Fields */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
      </div>

      {/* Cart Summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalcartamount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalcartamount() === 0 ? 0 : 2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default Placeorder;
