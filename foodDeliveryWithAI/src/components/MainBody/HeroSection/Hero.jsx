import React from "react";
import background from "../../../assets/background.jpg";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-parent">
      <img src={background} alt="" />
      <div className="hero-text">
        <h1 className="namaste">Namaste</h1>
        <h2 className="what-text">What would you like to eat today?</h2>
        <div className="buttons">
          <Link to="/categories" className="order">
            Order
          </Link>
          <Link to="/suggestion" className="suggest-me">
            Suggest Me!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
