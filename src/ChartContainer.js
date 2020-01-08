import React from "react";
import "./ChartContainer.css";
import {
  LineChart,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line
} from "recharts";
import { connect } from "react-redux";

import { fetchData } from "./thunks";

export class ChartContainerDisconnected extends React.Component {
  componentDidMount() {
    const { data, fetchData, activePeriod } = this.props;
    if (data.length === 0) {
      fetchData(activePeriod)();
    }
  }

  render() {
    const { data, isLoading, activeViewMode } = this.props;
    return (
      <div className="chart-wrapper">
        {isLoading ? (
          <p id="loading_text" test-id="loading">
            Loading...
          </p>
        ) : (
          <LineChart
            width={400}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey={activeViewMode}
              stroke="#ff7300"
              yAxisId={0}
            />
          </LineChart>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.bondsData.data,
    isLoading: state.time.isLoading,
    activePeriod: state.time.activePeriod,
    activeViewMode: state.viewMode.activeMode
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchData: period => dispatch(fetchData(period))
  };
}

const ChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainerDisconnected);

export default ChartContainer;
