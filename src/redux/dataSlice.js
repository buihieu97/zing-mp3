import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topChartVn: [],
  newReleases: [],
  topRap: [],
  playList: [],
  playListSearch: [],
  currentIndex: null,
  namePlayList: "",
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addTopChartVn: (state, actions) => {
      state.topChartVn = actions.payload;
    },

    setCurrentIndex: (state, actions) => {
      state.currentIndex = actions.payload;
    },

    addNamePlayList: (state, actions) => {
      state.namePlayList = actions.payload;
    },
    addTopRap: (state, actions) => {
      state.topRap = actions.payload;
    },
    addPlayList: (state, actions) => {
      state.playList = actions.payload;
    },
    addPlayListSearch: (state, actions) => {
      state.playListSearch = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTopChartVn,
  setCurrentIndex,
  addNamePlayList,
  addTopRap,
  addPlayList,
  addPlayListSearch,
} = dataSlice.actions;

export default dataSlice.reducer;
