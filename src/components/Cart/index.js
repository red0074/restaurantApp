import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

class Cart extends Component {
  state = {
    restaurantName: '',
  }

  componentDidMount() {
    this.fetchRestaurantName()
  }

  fetchRestaurantName = async () => {
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({restaurantName: data[0].restaurant_name})
      }
    } catch (error) {
      console.error('Error fetching restaurant name:', error)
    }
  }

  render() {
    const {restaurantName} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0

          const onClickRemoveAll = () => {
            removeAllCartItems()
          }

          return (
            <>
              <Header restaurantName={restaurantName} />
              <div className="cart-container">
                {showEmptyView ? (
                  <div className="cart-empty-view">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                      className="cart-empty-image"
                      alt="cart empty"
                    />
                    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
                    <Link to="/">
                      <button type="button" className="shop-now-btn">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="cart-content-container">
                    <div className="cart-header">
                      <h1 className="cart-heading">My Cart</h1>
                      <button
                        type="button"
                        className="remove-all-btn"
                        onClick={onClickRemoveAll}
                      >
                        Remove All
                      </button>
                    </div>
                    <ul className="cart-list">
                      {cartList.map(eachCartItem => (
                        <CartItem
                          key={eachCartItem.dish_id}
                          cartItemDetails={eachCartItem}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
