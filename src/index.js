import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
//import Sidebar from "./components/Sidebar/Sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex w-full">
        {/* <div className="w-[50%] fixed">
        <Sidebar/>
        </div>  */}
        <div className="flex-grow">
          <Provider store={store}>
            <App />
          </Provider>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
