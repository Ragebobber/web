import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import Subscription from "./store/Subscription";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const Context = createContext(null);

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                userSubs: new Subscription(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);

