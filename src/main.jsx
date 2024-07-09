import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
);
