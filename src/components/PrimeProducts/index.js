import { Component } from "react";
import jsCookie from "js-cookie";
import ProductCard from "../ProductCard";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class PrimeProducts extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getPrimeProducts();
  }

  getPrimeProducts = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const jwtToken = jsCookie.get("jwt_token");
    const url = "https://apis.ccbp.in/prime-deals";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);

    if (response.ok === true) {
      const data = await response.json();
      const updatedData = data.prime_deals.map((each) => ({
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
      /* console.log(updatedData); */
      this.setState({ productsList: updatedData });
      this.setState({ apiStatus: apiStatusConstants.success });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderOnSuccess = () => {
    const { productsList } = this.state;
    return (
      <ul className="prime-products-container">
        {productsList.map((each) => (
          <ProductCard eachProduct={each} key={each.id} />
        ))}
      </ul>
    );
  };

  renderOnFailure = () => {
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="prime banner"
        className="prime-banner-image"
      />
    );
  };

  renderOnLoading = () => {
    return (
      <div>
        <ThreeDots height={50} width={50} color="#0967d2" />
      </div>
    );
  };

  renderAllPrimeData = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccess();
        break;
      case apiStatusConstants.failure:
        return this.renderOnFailure();
        break;
      case apiStatusConstants.inProgress:
        return this.renderOnLoading();
        break;
      default:
        return null;
    }
  };

  render() {
    return (
        <div className="main-prime-details-container">
            {this.renderAllPrimeData()}
        </div>
    )
  }
}

export default PrimeProducts;
