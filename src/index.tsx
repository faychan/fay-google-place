import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { autocompleteEpic, autocompleteReducer } from "./components/AutocompleteEpic";

import { Action } from "./types";
import { App } from "./App";

const epicMiddleware: EpicMiddleware<Action> = createEpicMiddleware();
const store = configureStore({
  reducer: autocompleteReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)});
epicMiddleware.run(autocompleteEpic);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "24px"}}>
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);
