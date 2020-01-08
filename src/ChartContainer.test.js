import React from "react";
import { shallow, mount } from "enzyme";
import ChartContainer, { ChartContainerDisconnected } from "./ChartContainer";
import { Provider } from "react-redux";
import { store } from "./store";
import { LineChart } from "recharts";

describe("ChartContainer component", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <ChartContainer />
      </Provider>
    );
  });

  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  afterAll(() => {
    wrapper.detach();
  });
});

describe("ChartContainer Component", () => {
  let wrapper;
  let fetchFn;
  beforeAll(() => {
    const innerFn = jest.fn();
    fetchFn = jest.fn(() => innerFn);
    wrapper = shallow(
      <ChartContainerDisconnected
        isLoading={true}
        data={[]}
        fetchData={fetchFn}
      />
    );
  });

  test("should have appropriate props", () => {
    expect(wrapper.instance().props.isLoading).toBe(true);
    expect(wrapper.instance().props.data).toEqual([]);
  });

  test("should show loading when isLoading is true", () => {
    expect(
      wrapper.contains(
        <p id="loading_text" test-id="loading">
          Loading...
        </p>
      )
    ).toBe(true);
    expect(wrapper.find(LineChart).get(0)).toBe(undefined);
  });

  test("should not show loading when isLoading is false", () => {
    wrapper.setProps({ isLoading: false });
    expect(
      wrapper.contains(
        <p id="loading_text" test-id="loading">
          Loading...
        </p>
      )
    ).toBe(false);
    expect(wrapper.find(LineChart).get(0)).not.toBe(undefined);
  });

  test("should call fetchItems method when no data is provided", () => {
    expect(fetchFn.mock.calls.length).toBe(1);
  });

  afterAll(() => {
    wrapper.detach();
  });
});
