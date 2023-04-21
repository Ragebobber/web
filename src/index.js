import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import Subscription from "./store/Subscription";
import ProductStore from "./store/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        userSubs: new Subscription(),
        productStore: new ProductStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
