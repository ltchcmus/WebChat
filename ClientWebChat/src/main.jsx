import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./component/GlobalStyles";
import GlobalStyles from "./component/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </React.StrictMode>
);
