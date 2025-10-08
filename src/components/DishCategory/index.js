import DishItem from '../DishItem'
import './index.css'

const DishCategory = props => {
  const {category, cart, updateCart} = props

  return (
    <div className="dish-category-container">
      <div className="dish-category-content">
        <h2 className="category-heading">{category.menu_category}</h2>
        <ul className="dishes-list">
          {category.category_dishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dishDetails={dish}
              count={cart[dish.dish_id] || 0}
              updateCart={updateCart}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DishCategory
