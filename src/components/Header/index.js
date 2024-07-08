import { Link, useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import cartContext from "../../context/cartContext";
import "./index.css";

const Header = () => {
    let navigate = useNavigate()

    const onClickLogoutBtn = () => {
        jsCookie.remove('jwt_token')
        navigate('/login')
    }

    const renderCartItemsCount = () => (
      <cartContext.Consumer>
        {value => {
          const {cartList} = value
          const cartItemsCount = cartList.length
  
          return (
            <>
              {cartItemsCount > 0 ? (
                <span className="cart-count-style">{cartList.length}</span>
              ) : null}
            </>
          )
        }}
      </cartContext.Consumer>
    )

  return (
    <div className="header-container">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/" className="link-style">
          <img
            className="home-logo-style"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="Logo"
          />
          </Link>
          <button onClick={onClickLogoutBtn} className="btn sm-logout-btn-style">
            <img
              className="sm-logout-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="Logout"
            />
          </button>
        </div>

        <ul className="sm-nav-list">
          <Link to="/">
          <li className="sm-each-li">
            <button className="btn sm-home-btn">
              <img
                width={30}
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="Home"
              />
            </button>
          </li>
          </Link>
          <Link to="/products">
          <li className="sm-each-li">
            <button className="btn sm-products-btn">
              <img
                width={30}
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="Products"
              />
            </button>
          </li>
          </Link>
          <Link to="/cart" className="header-link">
          <li className="sm-each-li sm-header-cart-link">
            <button className="btn sm-cart-btn">
              <img
                width={30}
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="Cart"
              />
            </button>
            {renderCartItemsCount()}
          </li>
          </Link>
        </ul>

        <ul className="lg-nav-list">
          <Link to="/" className="link-style">
            <li className="lg-each-li">Home</li>
          </Link>
          <Link to="/products" className="link-style">
            <li className="lg-each-li">Products</li>
          </Link>
          <Link to="/cart" className="link-style ">
            <li className="lg-each-li lg-header-cart-link">Cart {renderCartItemsCount()}</li>
          </Link>

          <li className="lg-each-li">
            <button onClick={onClickLogoutBtn} className="lg-logout-btn">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
