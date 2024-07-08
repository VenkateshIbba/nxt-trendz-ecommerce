import { Link } from 'react-router-dom'
import './index.css'

const Payment = () => {
    return (
        <div className="payment-container">
            <img src="https://i.ibb.co/xL1qPdj/Vector.png" alt="payment sucessfull" />
            <h1 className="payment-text">Payment Successful</h1>
            <h3 className="payment-para-text">
                Thank you for ordering Your payment is successfully completed.
            </h3>
            <Link to="/">
                <button className="payment-home-btn" type="button">
                    Go to Home Page
                </button>
            </Link>
        </div>
    )
}

export default Payment