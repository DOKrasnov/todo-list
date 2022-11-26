import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * @file index.js is the root file for this app
 * @author Dmitrii Krasnov <krasnov.dmitry.o@gmail.com>
 * @
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
