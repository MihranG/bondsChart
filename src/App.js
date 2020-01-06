import React from "react";
import { Provider } from "react-redux";
import "./App.css";

import { store } from "./store";

import ChartContainer from "./ChartContainer";
import TimePeriodsComponent from "./TimePeriodsComponent";
import DropDownMenu from "./DropDownMenu";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TimePeriodsComponent />
        <ChartContainer />
        <DropDownMenu />
      </Provider>
    </div>
  );
}

export default App;
