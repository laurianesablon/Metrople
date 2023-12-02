import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import metroLinesData from "../data/metroLines.json";
import metroStationsData from "../data/metroStations.json";
import parisPerimeterData from "../data/parisPerimeter.json";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    metroStations: metroStationsData,
    metroLines: metroLinesData,
    parisPerimeter: parisPerimeterData,
    loading: "idle",
    error: "",
  },
  reducers: {},
  // Since we no longer need the extraReducers for async actions, we can remove that part
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;