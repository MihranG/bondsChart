import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialBlogStoreState = {
  activePeriod: "week",
  isLoading: false
};

const timePeriodSlice = createSlice({
  name: "timePeriod",
  initialState: initialBlogStoreState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setActiveTimePeriod(state, action) {
      state.activePeriod = action.payload;
    }
  }
});

const bondsDataSlice = createSlice({
  name: "bondsData",
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    clearData(state) {
      state.data = [];
    }
  }
});

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState: { activeMode: "price" },
  reducers: {
    setActiveMode(state, action) {
      state.activeMode = action.payload;
    }
  }
});

const rootReducer = combineReducers({
  time: timePeriodSlice.reducer,
  bondsData: bondsDataSlice.reducer,
  viewMode: viewModeSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export const {
  actions: { setLoading, setActiveTimePeriod },
  reducer: timePeriodReducer
} = timePeriodSlice;

export const {
  actions: { setData, clearData },
  reducer: bondsDataReducer
} = bondsDataSlice;

export const {
  actions: { setActiveMode },
  reducer: viewModeReducer
} = viewModeSlice;
