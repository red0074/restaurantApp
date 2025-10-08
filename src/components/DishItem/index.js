import './index.css'

const DishItem = props => {
  const {dishDetails, count, updateCart} = props
  const {
    dish_id,
    dish_name,
    dish_price,
    dish_image,
    dish_currency,
    dish_calories,
    dish_description,
    dish_Availability,
    dish_Type,
    addonCat,
  } = dishDetails

  const hasCustomizations = addonCat && addonCat.length > 0

  const onClickIncrement = () => {
    if (dish_Availability) {
      updateCart(dish_id, 'increment')
    }
  }

  const onClickDecrement = () => {
    if (dish_Availability) {
      updateCart(dish_id, 'decrement')
    }
  }

  const renderDishType = () => {
    // dish_Type === 2 means veg, dish_Type === 1 means non-veg
    if (dish_Type === 2) {
      return <div className="dish-type-indicator veg-indicator" />
    }
    return <div className="dish-type-indicator non-veg-indicator" />
  }

  return (
    <li className="dish-item">
      <div className="dish-item-details">
        {renderDishType()}
        <h3 className="dish-name">{dish_name}</h3>
        <div className="dish-price-container">
          <p className="dish-price">
            {dish_currency} {dish_price}
          </p>
        </div>
        <p className="dish-description">{dish_description}</p>
        {dish_calories && (
          <p className="dish-calories">{dish_calories} calories</p>
        )}
        {hasCustomizations && (
          <p className="customizations-available">Customizations available</p>
        )}
        <div className="dish-actions">
          <button
            type="button"
            className={`quantity-button decrement-button ${
              !dish_Availability ? 'disabled-button' : ''
            }`}
            onClick={onClickDecrement}
            disabled={!dish_Availability}
          >
            -
          </button>
          <p className="quantity-count">{count}</p>
          <button
            type="button"
            className={`quantity-button increment-button ${
              !dish_Availability ? 'disabled-button' : ''
            }`}
            onClick={onClickIncrement}
            disabled={!dish_Availability}
          >
            +
          </button>
        </div>
        {!dish_Availability && (
          <p className="not-available-text">Not available</p>
        )}
      </div>
      {dish_image && (
        <div className="dish-image-container">
          <img src={dish_image} alt={dish_name} className="dish-image" />
        </div>
      )}
    </li>
  )
}

export default DishItem
