import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

//STYLE
import "./styles/combiner.scss";

//REACT-ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom";

//COMPONENTS
import Navbar from "./components/Navbar/Navbar.jsx";
import MainBody from "./components/MainBody/MainBody.jsx";
import Categories from "./components/categories/Categories.jsx";
import Cart from "./components/cart/Cart.jsx";
import Suggestion from "./components/aiSection/Suggestion.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import About from "./components/about/About.jsx";
import Protected from "./components/protected/Protected.jsx";

//AUTHENTICATION
import { GoogleOAuthProvider } from "@react-oauth/google";
import Authenticate from "./components/authentication/Authenticate.jsx";

//REDUX
import { Provider } from "react-redux";

//STORE
import { store } from "./components/store/store.js";
import TestPayment from "./components/testPayment/TestPayment.jsx";
import Orders from "./components/Orders/Orders.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<MainBody />} />
            <Route
              path="/categories"
              element={<Protected Component={Categories} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/suggestion" element={<Suggestion />} />
            <Route
              path="/checkout"
              element={<Protected Component={Checkout} />}
            />
            <Route path="/login" element={<Authenticate />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/temp"
              element={<Protected Component={TestPayment} />}
            />
            <Route path="/orders" element={<Protected Component={Orders} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
  // </StrictMode>
);
