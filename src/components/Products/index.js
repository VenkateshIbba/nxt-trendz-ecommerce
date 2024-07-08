import { useReducer, useEffect } from "react";
import jsCookie from "js-cookie";
import Header from "../Header";
import PrimeProducts from "../PrimeProducts";
import ProductCard from "../ProductCard";
import ProductsFilter from "../ProductsFliter";
import {BsFilterRight} from 'react-icons/bs'
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Products = () => {

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { apiStatus:apiStatusConstants.initial, productsList: [], activecategory: "", activeSort: sortbyOptions[0].optionId, activeRating: "", activeSearch: ""}
  );

  const {activecategory, activeSort, activeRating, activeSearch} = state
  useEffect(() => {
    async function dataFetch() {
      setState({apiStatus: apiStatusConstants.inProgress})
      const jwtToken = jsCookie.get("jwt_token");
      const url = `https://apis.ccbp.in/products?sort_by=${activeSort}&category=${activecategory}&title_search=${activeSearch}&rating=${activeRating}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        /* console.log(data.products); */
        const updatedData = data.products.map((each) => ({
          brand: each.brand,
          id: each.id,
          imageUrl: each.image_url,
          price: each.price,
          rating: each.rating,
          title: each.title,
        }));
        setState({ productsList: updatedData, apiStatus: apiStatusConstants.success });
      }else {
        setState({apiStatus: apiStatusConstants.failure})
      }
    }
    dataFetch();
  }, [activecategory, activeRating, activeSort, activeSearch]);

  const updateCategory = activecategory => {
    setState({activecategory: activecategory})
  }

  const updateRating = activeRating => {
    setState({activeRating: activeRating})
  }

  const updateSearch = searchData => {
    setState({activeSearch: searchData})
  }

  const onChangeSort = event => {
    setState({activeSort: event.target.value})
  }

  const clearFilters = () => {
    setState({activecategory:"", activeRating:"", activeSearch:""})
  }

  const renderOnSuccess = () => {
    const {productsList} = state

    if (productsList.length > 0) {
      return (
        <ul className="products-container">
          {productsList.map((each) => (
            <ProductCard eachProduct={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
     <div className="no-products-container">
       <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt="no products" />
       <h1 className="no-products-text">No Products Found</h1>
       <h4 className="try-other-filter-text">We could not find any products. Try other filters.</h4>
     </div>
    )
  }

  const renderOnFaliure = () => {
    return (
      <div className="failure-container">
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png" alt="failure view" />
        <h1 className="oops-text">Oops! Something Went Wrong</h1>
        <h4 className="try-again-text">We are having some trouble processing your request. Please try again.</h4>
      </div>
    )
  }

  const renderOnLoading = () => {
    return (
      <div className="loading-container">
      <ThreeDots height={50} width={50} color="#0967d2" />
    </div>
    )
  } 
/* 
  const renderAllProducts = () => {
    const {apiStatus} = state

    switch(apiStatus) {
      case apiStatusConstants.success:
         renderOnSuccess()
        break;
      case apiStatusConstants.failure:
         renderOnFaliure()
        break
      case apiStatusConstants.inProgress:
         renderOnLoading()
        break
       default:
          null
    }
  } */

  const renderAllProducts = () => {
    const { apiStatus } = state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderOnSuccess();
        break;
      case apiStatusConstants.failure:
        return renderOnFaliure();
        break;
      case apiStatusConstants.inProgress:
        return renderOnLoading();
        break;
      default:
        return null;
    }
  };

  const { productsList } = state;
  /* console.log(productsList); */
  return (
    <>
    <Header />
    <h1 className="exclusive-deals-text">Exclusive Prime Deals</h1>
    <PrimeProducts />
    <div className="filter-all-products-container">
      <div className="filter-container">
      <ProductsFilter 
        categoryData = {categoryOptions}
        ratingData = {ratingsList}
        updateCategory = {updateCategory}
        updateRating = {updateRating}
        updateSearch = {updateSearch}
        clearFilters = {clearFilters}
      />
      </div>
      <div className="outer-products-container">
        <div className="products-header-container">
        <h1 className="all-products-text">All Products</h1>
        <div className="sort-select-container">
          <BsFilterRight color="#64748b"className="filter-icon" />
          <span className="sort-by-text">Sort by</span>
          <select className="sort-select" onChange={onChangeSort}>
          {sortbyOptions.map(each => (
            <option className="sort-option" value={each.optionId} key={each.optionId} >{each.displayText}</option>
          ))}
        </select>
        </div>
        </div>
        {renderAllProducts()}
      </div>
    </div>
  </>
  )

};
export default Products;
