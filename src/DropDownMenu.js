import React from "react";
import { connect } from "react-redux";

import { setActiveMode } from "./store";

const DropDownMenuDisconnected = ({ activeViewMode, handleChange }) => {
  return (
    <div className="dropdown-wrapper">
      <select onChange={handleChange} value={activeViewMode}>
        <option value="yield">Yield</option>
        <option value="spread">Spread</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

const mapStateToProps = state => ({
  activeViewMode: state.viewMode.activeMode
});
const mapDispatchToProps = dispatch => ({
  handleChange: e => dispatch(setActiveMode(e.target.value))
});

const DropDownMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownMenuDisconnected);

export default DropDownMenu;
