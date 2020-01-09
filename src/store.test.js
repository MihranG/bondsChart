import configureStore from "redux-mock-store";
import {
  setLoading,
  setActiveTimePeriod,
  setData,
  clearData,
  setActiveMode,
  store as realStore,
  timePeriodReducer,
  bondsDataReducer,
  viewModeReducer
} from "./store";

describe("Redux store", () => {
  const mockBondsData = [
    { price: 111, spread: 222, yield: 333, name: "testName2" },
    { price: 111, spread: 222, yield: 333, name: "testName2" }
  ];
  describe("should have appropriate", () => {
    const mockStore = configureStore();
    const store = mockStore();
    afterEach(() => {
      store.clearActions();
    });

    test("setLoading action", () => {
      store.dispatch(setLoading(true));
      expect(store.getActions()[0]).toEqual({
        payload: true,
        type: "timePeriod/setLoading"
      });
    });

    test("setActiveTimePeriod action", () => {
      store.dispatch(setActiveTimePeriod("testTimePeriod"));
      expect(store.getActions()[0]).toEqual({
        payload: "testTimePeriod",
        type: "timePeriod/setActiveTimePeriod"
      });
    });

    test("setData & clearData actions", () => {
      store.dispatch(setData(mockBondsData));
      expect(store.getActions()[0]).toEqual({
        payload: mockBondsData,
        type: "bondsData/setData"
      });
      expect(store.getActions()[0]).toMatchSnapshot();
      store.dispatch(clearData());
      expect(store.getActions()[1]).toEqual({
        payload: undefined,
        type: "bondsData/clearData"
      });
    });

    test("setActiveMode action", () => {
      store.dispatch(setActiveMode());
      expect(store.getActions()[0]).toEqual({
        payload: undefined,
        type: "viewMode/setActiveMode"
      });
    });
  });

  describe("should behave appropriate", () => {
    const initialState = realStore.getState();
    describe("when called timePeriodReducer with", () => {
      const ownInitialState = initialState.time;
      test("setLoading action", () => {
        expect(ownInitialState.isLoading).toBe(false);
        const newState = timePeriodReducer(ownInitialState, setLoading(true));
        expect(newState.isLoading).toBe(true);
      });

      test("setActiveTimePeriod action", () => {
        expect(ownInitialState.activePeriod).toBe("week");
        const testActivePeriod = "year";
        const newState = timePeriodReducer(
          ownInitialState,
          setActiveTimePeriod(testActivePeriod)
        );
        expect(newState.activePeriod).toBe(testActivePeriod);
      });
    });

    describe("when called bondsDataReducer with", () => {
      const ownInitialState = initialState.bondsData;
      test("setData  & clearData actions", () => {
        expect(ownInitialState.data).toEqual([]);
        let newState = bondsDataReducer(
          ownInitialState,
          setData(mockBondsData)
        );
        expect(newState.data).toBe(mockBondsData);
        newState = bondsDataReducer(newState, clearData());
        expect(newState.data).toEqual([]);
      });
    });

    describe("when called viewModeReducer with", () => {
      const ownInitialState = initialState.viewMode;
      test("setActiveMode action", () => {
        const setAbleActiveMode = "spread";
        expect(ownInitialState.activeMode).toEqual("price");
        const newState = viewModeReducer(
          ownInitialState,
          setActiveMode(setAbleActiveMode)
        );
        expect(newState.activeMode).toBe(setAbleActiveMode);
      });
    });
  });
});
