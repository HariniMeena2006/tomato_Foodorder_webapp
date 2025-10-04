import React from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import "./Verify.css"
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';

function Verify() {
  
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const navigate=useNavigate();
    console.log(success,orderId);
    const{url}=useContext(StoreContext);
   
    useEffect(() => {
    const timer = setTimeout(() => {
      if (success === "true") navigate("/myorders");
      else navigate("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [success, navigate]);


    return(
        <div className='verify'>
            <div className="spinner"></div>
        </div>

    )
    
  
}

export default Verify