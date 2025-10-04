import React, { useContext, useState } from 'react';
import "./loginpopup.css";
import { assets } from '../../assetss/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

function Loginpopup({ setShowlogin }) {
    const { url, setToken } = useContext(StoreContext);
    const [currstate, setCurrstate] = useState("login");  // keep it always lowercase
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currstate === "login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

      
            const response = await axios.post(newUrl, data);
            console.log("Backend response:", response.data); // 👈 debug

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token); // ✅ store token 
                setShowlogin(false);
            } else {
                alert(response.data.message);
            }
        
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className='login-popup-title'>
                    <h2>{currstate === "login" ? "Login" : "Sign up"}</h2>
                    <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {currstate === "login" ? null : (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type='text'
                            placeholder='Your Name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type='email'
                        placeholder='Your Email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type='password'
                        placeholder='Password'
                        required
                    />
                </div>

                <button type="submit">
                    {currstate === "login" ? "Login" : "Create account"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>

                {currstate === "login" ? (
                    <p>Create a new account? <span onClick={() => setCurrstate("signup")}>Click Here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrstate("login")}>Click Here</span></p>
                )}
            </form>
        </div>
    );
}

export default Loginpopup;
