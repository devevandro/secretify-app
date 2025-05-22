import "./globals.css";

import React from "react";

import ReactDom from "react-dom/client";

import { App } from "./App";

ReactDom.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
