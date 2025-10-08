import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div className="loading-view-container">
    <Loader type="ThreeDots" color="#d4002a" height={80} width={80} />
  </div>
)

export default LoadingView
