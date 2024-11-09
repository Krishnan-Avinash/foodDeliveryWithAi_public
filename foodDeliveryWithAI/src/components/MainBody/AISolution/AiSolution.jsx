import React from "react";
import secondBackground from "../../../assets/secondBackground.jpg";

const AiSolution = () => {
  return (
    <div className="aisolution-parent">
      <img src={secondBackground} alt="" />
      <div className="aisolution-content">
        <div className="aisolution-left">
          <div className="aisolution-left-heading">
            Get AI powered suggestions, tailored to <span>you</span>!
          </div>
          <div className="aisolution-left-button">
            <div className="suggest-me">
              Try The All New Suggestion Feature!
            </div>
          </div>
        </div>
        <div className="aisolution-right">
          <div className="aisolution-right-image">
            <div className="aisolution-right-image-left">
              What would you like to eat today?
            </div>
            <div className="temp-temp">
              <div className="aisolution-right-image-right">
                Something light and creamy
              </div>
            </div>
            <div className="aisolution-right-image-left2">
              Here you can try "Mushroom Vol Au Vent"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSolution;
