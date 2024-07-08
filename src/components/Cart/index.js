import { Link } from "react-router-dom";
import Header from "../Header";
import cartContext from "../../context/cartContext";
import CartItemCard from "../CartItemcard";
import "./index.css";

const Cart = () => (
  <cartContext.Consumer>
    {(value) => {
      const { cartList } = value;
      const showEmptyView = cartList.length === 0;
      let totalAmount = 0;
      cartList.forEach((each) => {
        totalAmount += each.price * each.count;
      });
      return (
        <>
          <Header />
          {showEmptyView ? (
            <div className="no-products-cont">
              <img
                width={300}
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="No Products"
              />
              <h1>Your Cart is Empty</h1>
              <Link to="/products">
                <button className="cart-shop-now-btn">Shop Now</button>
              </Link>
            </div>
          ) : (
            <div className="main-cart-container">
              <ul className="cart-container">
                {cartList.map((each) => (
                  <CartItemCard cartItemDetails={each} key={each.id} />
                ))}
              </ul>

              <div className="checkout-container">
                <div className="inner-checkout-cont">
                <h3 className="total-text">Order Total: <span className="total-figure-text">RS {totalAmount}/-</span></h3>
                <p className="items-text">{cartList.length} Items in cart</p>
                <Link to="/payment">
                <button className="checkout-btn" type="button">Checkout</button>
                </Link>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }}
  </cartContext.Consumer>
);

export default Cart;
