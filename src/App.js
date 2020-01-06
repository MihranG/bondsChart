import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import "./App.css";

import { store } from "./store";
import { priceApiGetterStandard } from "./fakeApi/fakeApiGetter";

import ChartContainer from "./ChartContainer";
import TimePeriodsComponent from "./TimePeriodsComponent";
import DropDownMenu from "./DropDownMenu";

function App() {
  const [timePeriod, setTimePeriod] = useState("week");
  const [bondData, setBondData] = useState([]);
  useEffect(() => {
    priceApiGetterStandard(timePeriod)
      .then(res => {
        setBondData(res);
      })
      .catch(e => console.error(e));
  }, [timePeriod]);

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
