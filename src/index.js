import React from "react";
import ReactDOM from "react-dom";
import { SWRConfig } from "swr";
import "./index.css";
import App from "./App";
import { AuthProvider } from "context/AuthContext";
import reportWebVitals from "./reportWebVitals";
import { fetcher } from "services/api";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
