import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
