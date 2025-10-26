import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_image: dishImage,
    dish_price: dishPrice,
    quantity,
    dish_currency: dishCurrency,
  } = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickDecrement = () => {
          decrementCartItemQuantity(dishId)
        }

        const onClickIncrement = () => {
          incrementCartItemQuantity(dishId)
        }

        const onRemoveCartItem = () => {
          removeCartItem(dishId)
        }

        const totalPrice = dishPrice * quantity

        return (
          <li className="cart-item">
            <img
              className="cart-product-image"
              src={dishImage}
              alt={dishName}
            />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <h1 className="cart-product-title">{dishName}</h1>
              </div>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onClickDecrement}
                >
                  -
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onClickIncrement}
                >
                  +
                </button>
              </div>
              <div className="total-price-remove-container">
                <p className="cart-total-price">
                  {dishCurrency} {totalPrice}/-
                </p>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onRemoveCartItem}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
