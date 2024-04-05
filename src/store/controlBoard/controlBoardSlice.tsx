import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { playgroundState } from "@/data/dataTypes";


const initialState = {
  writeMethod: false as boolean,
  playgroundState: "interaction" as playgroundState,
};

const controlBoardSlice = createSlice({
  name: "controlBoard",
  initialState,
  reducers: {
    setWriteMethod: (state, action: PayloadAction<boolean>) => {
      state.writeMethod = action.payload;
    },
    setPlaygroundState: (state, action: PayloadAction<playgroundState>) => {
      state.playgroundState = action.payload;
    },
  },
});

export const { setWriteMethod, setPlaygroundState } = controlBoardSlice.actions;

export default controlBoardSlice.reducer;
