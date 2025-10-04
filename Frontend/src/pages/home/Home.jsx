import React from 'react'
import  { useState } from 'react';
import Header from '../../components/header/Header'
import Exploremenu from '../../components/exploreMenu/Exploremenu'
import Fooddisplay from '../../components/food_display/Fooddisplay'
import Appdownload from '../../components/appdownload/Appdownload';


function Home() {
  const[category,setCategory]=useState("All");
  return (
    <div>
      <Header/>
      <Exploremenu category={category} setCategory={setCategory}/>
      <Fooddisplay  category={category} />
      <Appdownload/>

    </div>
  )
}

export default Home
