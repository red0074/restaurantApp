import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName = 'Restaurant'} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <nav className="header-container">
            <div className="header-content">
              <Link to="/" className="logo-link">
                <div className="logo-container">
                  <h1 className="logo-heading">{restaurantName}</h1>
                </div>
              </Link>
              <div className="header-actions">
                <Link to="/cart" className="cart-link">
                  <div className="cart-container">
                    <p className="my-orders-text">My Orders</p>
                    <button
                      type="button"
                      className="cart-icon-button"
                      data-testid="cart"
                    >
                      <FaShoppingCart className="cart-icon" />
                      {cartItemsCount > 0 && (
                        <div className="cart-count-badge">{cartItemsCount}</div>
                      )}
                    </button>
                  </div>
                </Link>
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  <FiLogOut className="logout-icon" />
                  <span className="logout-text">Logout</span>
                </button>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
