import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import ChartContainer from "./ChartContainer";
import DropDownMenu from "./DropDownMenu";
import TimePeriodsComponent from "./TimePeriodsComponent";

describe("App component", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  it("should match  snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  afterAll(() => {
    wrapper.unmount();
  });
});

describe("Whole application", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<App />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have appropriate components", () => {
    expect(wrapper.find(ChartContainer).get(0)).not.toBe(undefined);
    expect(wrapper.find(DropDownMenu).get(0)).not.toBe(undefined);
    expect(wrapper.find(TimePeriodsComponent).get(0)).not.toBe(undefined);
  });

  afterAll(() => {
    wrapper.detach();
  });
});
