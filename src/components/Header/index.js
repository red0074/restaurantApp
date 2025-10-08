import {FaShoppingCart} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const {restaurantName, cartCount} = props

  return (
    <nav className="header-container">
      <div className="header-content">
        <div className="logo-container">
          <h1 className="logo-heading">{restaurantName || 'Restaurant'}</h1>
        </div>
        <div className="cart-container">
          <p className="my-orders-text">My Orders</p>
          <div className="cart-icon-container">
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && (
              <div className="cart-count-badge">{cartCount}</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
