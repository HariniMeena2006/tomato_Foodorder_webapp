import React from 'react'
import { assets } from '../../assetss/assets'
import "./appdownload.css"

function Appdownload() {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/> Tomato App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store}/>
            <img src={assets.app_store}/>
        </div>

    </div>
  )
}

export default Appdownload