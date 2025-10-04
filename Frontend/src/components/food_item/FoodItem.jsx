import React, { useContext } from 'react'
import { assets } from '../../assetss/assets'  // <-- make sure folder name is correct
import "./Fooditem.css"
import { StoreContext } from '../../context/StoreContext'

function FoodItem({ id, name, price, description, image }) {
    const { cartItems, addTocart, removeFromcart, url } = useContext(StoreContext)

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className="food-item-image" src={url + "/images/" + image} alt="" />
                {cartItems && (!cartItems[id] ? 
                    <img className='add' onClick={() => addTocart(id)} src={assets.add_icon_white} alt="" /> :
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromcart(id)} src={assets.remove_icon_red} />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addTocart(id)} src={assets.add_icon_green} />
                    </div>
                )}
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
