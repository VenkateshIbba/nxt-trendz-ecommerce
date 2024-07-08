import { Link } from "react-router-dom";
import "./index.css";

const ProductCard = props => {
  const { eachProduct } = props;
  const { id, title, brand, price, imageUrl, rating } = eachProduct;
  return (
   <Link to={`/products/${id}`} className="product-link-style">
    <li className="prime-li-stylee">
      <img className="product-image" src={imageUrl} alt={title} />
      <h2 className="title-textt">{title}</h2>
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
export default ProductCard;
