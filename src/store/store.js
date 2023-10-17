import { createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        metroLines: undefined,
        metroStations: undefined,
        parisPerimeter: undefined,
    },
    reducers: {
        setMetroLines: (state, action) => {
            state.metroLines = action.payload;
        },
        setMetroStations: (state, action) => {
            state.metroStations = action.payload;
        },
        setParisPerimeter: (state, action) => {
            state.parisPerimeter = action.payload;
        }

    }
})

const dataReducer = dataSlice.reducer;
export const { setMetroLines, setMetroStations, setParisPerimeter } = dataSlice.actions;
const reducer = combineReducers({
    data: dataReducer
})


const store = configureStore({ reducer })
export default store