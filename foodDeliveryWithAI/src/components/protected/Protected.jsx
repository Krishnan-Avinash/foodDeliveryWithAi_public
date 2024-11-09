import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log(isAuthenticated);
  const navigate = useNavigate();
  // console.log("hehe");
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
