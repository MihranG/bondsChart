import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("App component", () => {
  let component;
  beforeAll(() => {
    component = render(<App />);
  });
  it("should match snapshot", () => {
    let tree = component.toJson();
    expect(tree).toMatchSnapshot();
  });
});
