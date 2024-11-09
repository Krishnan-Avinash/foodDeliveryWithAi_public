import React from "react";
import cart from "../../assets/cart2-removebg-preview (1).png";

// ROUTER DOM
import { Outlet, Link } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

const Navbar = () => {
  const itemsList = useSelector((state) => state.reducer.itemsList);
  const userFromRedux = useSelector((state) => state.user.userDetails);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const elements = [
    { name: "Categories", toGo: "/categories" },
    { name: "About", toGo: "/about" },
    { name: isAuthenticated ? "Logout" : "LogIn / SignUp", toGo: "/login" },
    { name: "Orders", toGo: "/orders" },
    { name: "Suggest Me", toGo: "/suggestion" },
  ];

  return (
    <>
      <div className="navbar-parent">
        <div className="navbar-left">
          <Link to="/">Foodcy</Link>
        </div>
        <div className="navbar-mid">
          {elements.map((item, index) => (
            <div
              className={
                item.name === "Suggest Me"
                  ? "suggestMeNavbar"
                  : "navbar-elements"
              }
              key={index}
            >
              <Link to={item.toGo}>{item.name}</Link>
            </div>
          ))}
        </div>
        <div className="navbar-right">
          <div className="navbar-right-left">
            <input
              type="text"
              readOnly
              placeholder={`Welcome ${
                isAuthenticated ? userFromRedux.email : ""
              }`}
            />
          </div>
          <Link to="/cart" className="navbar-right-right">
            <img src={cart} alt="Cart Icon" />
            {itemsList.length !== 0 && <div className="cart-count"></div>}
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
