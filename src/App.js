import React, {useState,useEffect} from 'react';
import './App.css';

import {priceApiGetterStandard} from './fakeApi/fakeApiGetter'

import ChartContainer from './ChartContainer'
import TimePeriodsComponent from './TimePeriodsComponent'

function App() {
  const [timePeriod, setTimePeriod] = useState('week');
  const [bondData, setBondData] = useState([])
  useEffect(()=>{
    priceApiGetterStandard(timePeriod).then(res=>{
      setBondData(res)
    }).catch(e=>console.error(e))
  },[timePeriod])

  return (
    <div className="App">
      <TimePeriodsComponent timePeriodHandler={setTimePeriod}  activePeriod={timePeriod}/>
      <ChartContainer data={bondData} />
    </div>
  );
}

export default App;
