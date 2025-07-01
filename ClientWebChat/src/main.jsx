import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./component/GlobalStyles";
import GlobalStyles from "./component/GlobalStyles";
import { UserProvider } from "./component/UserProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </UserProvider>
  </React.StrictMode>
);
