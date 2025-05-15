import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./provider.tsx";
import { BrowserRouter } from "./router.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Provider>
        <BrowserRouter></BrowserRouter>
      </Provider>
  </React.StrictMode>,
);
