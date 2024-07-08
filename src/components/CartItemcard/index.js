import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import cartContext from "../../context/cartContext";
import "./index.css";

const CartItemCard = (props) => (
  
    <cartContext.Consumer>
        {value => {
            const { cartItemDetails } = props;
            const { id, title, brand, price, imageUrl, count } = cartItemDetails;
            const {deleteCartItem, increaseCartItem, decreaseCartItem} = value
            
            const onClickRemoveBtn = () => {
                deleteCartItem(id)
            }
            const onClickIncreaseBtn = () => {
              increaseCartItem(cartItemDetails)
            }
            const onClickDecreaseBtn = () => {
              decreaseCartItem(cartItemDetails)
            }


            return (
              <li className="each-cart-item">
                <div className="cart-lg-image-tb-cont">
                <img className="cart-image" src={imageUrl} alt={title} />
                <div className="cart-lg-title-brand-cont">
                  <h2 className="cart-title">{title}</h2>
                  <h4 className="cart-brand">by {brand}</h4>
                </div>
                </div>
                <div className="cart-title-sm-brand-cont">
                  <h2 className="cart-sm-title">{title}</h2>
                  <h4 className="cart-sm-brand">by {brand}</h4>
                  <div className="cart-count-container">
                    <button onClick={onClickDecreaseBtn} className="cart-plus-minus-btn">
                      <AiOutlineMinusSquare className="plus-minus-icon" />
                    </button>
                    <span className="cart-count">{count}</span>
                    <button onClick={onClickIncreaseBtn} className="cart-plus-minus-btn">
                      <AiOutlinePlusSquare className="plus-minus-icon" />
                    </button>
                  </div>
                  <h2 className="price-text">Rs {price*count}/-</h2>
                  <button onClick={onClickRemoveBtn} className="cart-lg-remove-btn"> 
                    <p >Remove</p>
                </button>
                </div>
                <button onClick={onClickRemoveBtn} className="cart-sm-remove-btn"> 
                    <p >Remove</p>
                </button>
              </li>
            )
        }}
    </cartContext.Consumer>
)

export default CartItemCard;
