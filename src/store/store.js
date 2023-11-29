import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import metroLinesData from "../data/metroLines.geojson";
import metroStationsData from "../data/metroStations.geojson";
import parisPerimeterData from "../data/parisPerimeter.geojson";
import * as d3 from "d3";

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const metroStations = await d3.json(metroStationsData);
  const metroLines = await d3.json(metroLinesData);
  const parisPerimeter = await d3.json(parisPerimeterData);
  return { metroStations, metroLines, parisPerimeter };
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    metroStations: {},
    metroLines: {},
    parisPerimeter: {},
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'pending';
        state.error = "";
        // console.log('fetchData pending');
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        // console.log('fetchData fulfilled');
        state.metroStations = action.payload.metroStations;
        state.metroLines = action.payload.metroLines;
        state.parisPerimeter = action.payload.parisPerimeter;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log('fetchData rejected');
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  }
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
