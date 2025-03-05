import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext);
    // console.log("Food Items", food_list)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <div key={index}>
                                    <FoodItem id={item._id} category={item.category} description={item.description} image={item.image} name={item.name} price={item.price} />
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay
