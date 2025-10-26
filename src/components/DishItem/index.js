import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = props => {
  const {dishDetails, count, updateCart} = props
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_image: dishImage,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_Availability: dishAvailability,
    dish_Type: dishType,
    addonCat,
  } = dishDetails

  const hasCustomizations = addonCat && addonCat.length > 0

  const onClickIncrement = () => {
    updateCart(dishId, 'increment')
  }

  const onClickDecrement = () => {
    updateCart(dishId, 'decrement')
  }

  const renderDishType = () => {
    if (dishType === 2) {
      return <div className="dish-type-indicator veg-indicator" />
    }
    return <div className="dish-type-indicator non-veg-indicator" />
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...dishDetails, quantity: count})
        }

        return (
          <li className="dish-item">
            <div className="dish-item-details">
              {renderDishType()}
              <h3 className="dish-name">{dishName}</h3>
              <div className="dish-price-container">
                <p className="dish-price">
                  {dishCurrency} {dishPrice}
                </p>
              </div>
              <p className="dish-description">{dishDescription}</p>
              {dishCalories && (
                <p className="dish-calories">{dishCalories} calories</p>
              )}
              {hasCustomizations && (
                <p className="customizations-available">
                  Customizations available
                </p>
              )}
              {dishAvailability ? (
                <div className="dish-controls">
                  <div className="dish-actions">
                    <button
                      type="button"
                      className="quantity-button decrement-button"
                      onClick={onClickDecrement}
                    >
                      -
                    </button>
                    <p className="quantity-count">{count}</p>
                    <button
                      type="button"
                      className="quantity-button increment-button"
                      onClick={onClickIncrement}
                    >
                      +
                    </button>
                  </div>
                  {count > 0 && (
                    <button
                      type="button"
                      className="add-to-cart-button"
                      onClick={onClickAddToCart}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              ) : (
                <p className="not-available-text">Not available</p>
              )}
            </div>
            {dishImage && (
              <div className="dish-image-container">
                <img src={dishImage} alt={dishName} className="dish-image" />
              </div>
            )}
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
