import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";


const Home = () => {

  return (
    <>
    <Header />
    <div className="home-container">
      <div>
        <h1 className="home-clothes-text">Clothes That Get YOU Noticed</h1>
        <img
          className="sm-home-banner"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="Homme Banner"
        />
        <p className="home-para-text">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <Link to="/products" className="link-style">
        <button className="shop-now-btn">Shop Now</button>
        </Link>
      </div>
      <img
          className="lg-home-banner"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="Homme Banner"
        />
    </div>
    </>
  );
};

export default Home;
