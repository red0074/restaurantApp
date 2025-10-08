import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import Header from './components/Header'
import DishCategory from './components/DishCategory'
import LoadingView from './components/LoadingView'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    restaurantData: {},
    categories: [],
    selectedCategoryIndex: 0,
    cart: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchRestaurantData()
  }

  componentWillUnmount() {
    // Cleanup to prevent Jest environment errors
    this.setState = () => {}
  }

  fetchRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )

      if (response.ok) {
        const data = await response.json()
        const formattedData = {
          restaurantId: data[0].restaurant_id,
          restaurantName: data[0].restaurant_name,
          restaurantImage: data[0].restaurant_image,
          location: data[0].location,
          cuisine: data[0].restaurant_cuisine,
          rating: data[0].rating,
          ratingCount: data[0].rating_count,
          costForTwo: data[0].cost_for_two,
          categories: data[0].table_menu_list,
        }

        this.setState({
          restaurantData: formattedData,
          categories: formattedData.categories || [],
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCategoryTab = index => {
    this.setState({selectedCategoryIndex: index})
  }

  getTotalCartCount = () => {
    const {cart} = this.state
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  updateCart = (dishId, action) => {
    this.setState(
      prevState => {
        const {cart} = prevState
        const currentCount = cart[dishId] || 0

        let newCount = currentCount

        if (action === 'increment') {
          newCount = currentCount + 1
        } else if (action === 'decrement' && currentCount > 0) {
          newCount = currentCount - 1
        }

        if (newCount === 0) {
          const {[dishId]: removed, ...remainingCart} = cart
          return {cart: remainingCart}
        }

        return {
          cart: {
            ...cart,
            [dishId]: newCount,
          },
        }
      },
      () => {
        // Callback after state update completes
      },
    )
  }

  renderCategoryTabs = () => {
    const {categories, selectedCategoryIndex} = this.state

    return (
      <div className="category-tabs-container">
        <ul className="category-tabs-list">
          {categories.map((category, index) => (
            <li key={category.menu_category_id} className="category-tab-item">
              <button
                type="button"
                className={`category-tab-button ${
                  selectedCategoryIndex === index ? 'active-tab' : ''
                }`}
                onClick={() => this.onChangeCategoryTab(index)}
              >
                {category.menu_category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {categories, selectedCategoryIndex, cart} = this.state

    if (categories.length === 0) {
      return (
        <div className="no-dishes-view">
          <p>No dishes available</p>
        </div>
      )
    }

    return (
      <>
        {this.renderCategoryTabs()}
        <DishCategory
          category={categories[selectedCategoryIndex]}
          cart={cart}
          updateCart={this.updateCart}
        />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <h2 className="failure-heading">Oops! Something Went Wrong</h2>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.fetchRestaurantData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => <LoadingView />

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {restaurantData} = this.state
    const cartCount = this.getTotalCartCount()

    return (
      <div className="app-container">
        <Header
          restaurantName={restaurantData.restaurantName}
          cartCount={cartCount}
        />
        <div className="restaurant-content">{this.renderViews()}</div>
      </div>
    )
  }
}

export default App
