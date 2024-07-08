import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import "./index.css";

const SimilarProductsCard = props => {
  const navigate = useNavigate()
  const { eachProduct, onClickSimilarPro } = props;
  const { id, title, brand, price, imageUrl, rating } = eachProduct;

  const onClickLiEle = () => {
    onClickSimilarPro(id)
  }



  
  return (
    <Link to={`/products/${id}`} className="product-link-style">
      <li onClick={onClickLiEle} className="prime-li-style">
      <img className="product-image" src={imageUrl} alt={title} />
      <h2 className="title-text">{title}</h2>
      <h3 className="brand-text">by {brand}</h3>
      <div className="cost-rating-container">
        <span className="price-style">Rs {price}/-</span>
        <button className="cost-rating-btn">
          {rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            width={20}
          />
        </button>
      </div>
    </li>
    </Link>
    
  );
};
export default SimilarProductsCard;
