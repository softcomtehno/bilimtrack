import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "./provider.tsx";
import { BrowserRouter } from "./router.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </React.StrictMode>
);
