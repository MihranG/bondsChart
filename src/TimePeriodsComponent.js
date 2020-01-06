import React from "react";

import "./TimePeriods.css";
import { connect } from "react-redux";

import { setActiveTimePeriod } from "./store";
import { fetchData } from "./thunks";

const TIMELAPSES = [
  { id: "week", name: "Week" },
  { id: "month", name: "Month" },
  { id: "quarter", name: "Quarter" },
  { id: "year", name: "Year" },
  { id: "max", name: "Max" }
];

function TimeLapseComponentDisconnected({
  timePeriodHandler,
  fetchData,
  activePeriod
}) {
  const clickHandler = e => {
    timePeriodHandler(e.target.id);
    fetchData(e.target.id)();
  };
  return (
    <div className="buttons-wrapper">
      {TIMELAPSES.map(time => (
        <button
          className={
            activePeriod === time.id
              ? "active periods-button"
              : "periods-button"
          }
          key={time.id}
          id={time.id}
          onClick={clickHandler}
        >
          {time.name}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  activePeriod: state.time.activePeriod
});

const mapDispatchtoProps = dispatch => ({
  timePeriodHandler: id => dispatch(setActiveTimePeriod(id)),
  fetchData: period => dispatch(fetchData(period))
});

const TimePeriodsComponent = connect(
  mapStateToProps,
  mapDispatchtoProps
)(TimeLapseComponentDisconnected);

export default TimePeriodsComponent;
