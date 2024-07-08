import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import Header from "../Header";
import SimilarProductsCard from "../SimilarProductsCard";
import ProductCard from "../ProductCard";
import cartContext from "../../context/cartContext";

import "./index.css";

const EachProduct = () => {
  const id = useParams();
  /* console.log(id); */

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { eachProductData: [], similarProducts: [], isLoading: true, count: 1, activeId:""}
  );
  const navigate = useNavigate();
  const { count, activeId } = state;
  useEffect(() => {
    /* console.log('UI rendered'); */
    async function dataFetch() {
      const jwtToken = jsCookie.get("jwt_token");
      const url = `https://apis.ccbp.in/products/${id.id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        /* console.log(data); */
        const updatedData = {
          availability: data.availability,
          brand: data.brand,
          description: data.description,
          id: data.id,
          imageUrl: data.image_url,
          price: data.price,
          rating: data.rating,
          style: data.style,
          title: data.title,
          totalReviews: data.total_reviews,
        };
        const updatedSimilarproducts = data.similar_products.map((each) => ({
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.image_url,
          price: each.price,
          rating: each.rating,
          style: each.style,
          title: each.title,
          totalReviews: each.total_reviews,
        }));
        setState({
          eachProductData: updatedData,
          similarProducts: updatedSimilarproducts,
          isLoading: false,
        });
      }
    }
    dataFetch();
  }, [count, activeId]);


  const onClickMinusBtn = () => {
    const { count } = state;
    if (count > 1) {
      setState({ count: count - 1 });
    }
  };

  const onClickPlusBtn = () => {
    setState({ count: count + 1 });
  };

  return (
    <cartContext.Consumer>
      {(value) => {
        const { eachProductData, count } = state;
        const {
          imageUrl,
          title,
          price,
          rating,
          description,
          totalReviews,
          availability,
          brand,
        } = eachProductData;
        const { similarProducts } = state;
        const { addCartItem } = value;

        const onClickAddToCartBtn = () => {
          addCartItem({ ...eachProductData, count });
        };

        const onClickSimilarPro= id => {
          setState({activeId:id})
        }

        return (
          <>
            <Header />
            <div className="each-product-style-container">
              <img className="each-product-style" src={imageUrl} alt={title} />
              <div className="inner-each-product-style">
                <h2 className="each-product-title-text">{title}</h2>
                <h2 className="each-product-price-text">Rs {price}</h2>
                <div className="each-product-rating-review-cont">
                  <span className="rating-cont">
                    {rating} <AiFillStar color="#fff" />
                  </span>
                  <span className="reviews-text">{totalReviews} Reviews</span>
                </div>
                <p className="description-text">{description}</p>
                <p className="available-brand-para">
                  Available:{" "}
                  <span className="a-b-text availability-text">
                    {availability}
                  </span>
                </p>
                <p className="available-brand-para">
                  Brand: <span className="a-b-text brand-text">{brand}</span>
                </p>
                <hr className="hr-style" />
                <div className="count-container">
                  <button onClick={onClickMinusBtn} className="plus-minus-btn">
                    <AiOutlineMinusSquare className="plus-minus-icon" />
                  </button>
                  <span className="count-text">{count}</span>
                  <button onClick={onClickPlusBtn} className="plus-minus-btn">
                    <AiOutlinePlusSquare className="plus-minus-icon" />
                  </button>
                </div>
                <button
                  onClick={onClickAddToCartBtn}
                  className="add-to-cart-btn"
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className="similar-products-container">
              <h1>Similar Products</h1>
              <ul className="similar-products-ul-list">
                {similarProducts.map((each) => (
                 <SimilarProductsCard onClickSimilarPro={onClickSimilarPro} eachProduct={each} key={each.id} />
                ))}
              </ul>
            </div>
          </>
        );
      }}
    </cartContext.Consumer>
  );
};

export default EachProduct;
