import React, { useContext } from 'react'
import "./Fooddisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../food_item/FoodItem'

function Fooddisplay({ category }) {
    const { food_list } = useContext(StoreContext)

    const filteredFood = food_list?.filter(
        item => category === "All" || category === item.category
    )

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {filteredFood?.map(item => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
                {filteredFood?.length === 0 && <p>No dishes available</p>}
            </div>
        </div>
    )
}

export default Fooddisplay
