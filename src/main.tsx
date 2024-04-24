import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundaries/ErrorBoundary";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextWrapper from "./context/UserContextWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextWrapper>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </UserContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
