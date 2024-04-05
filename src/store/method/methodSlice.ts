import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MethodItem } from "@/data/dataTypes";

const initialState = {
  methodItem: {} as MethodItem,
};

const methodSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setMethodItem: (state, action: PayloadAction<MethodItem>) => {
      state.methodItem = action.payload;
      console.log(state.methodItem);
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, () => {
  //         console.log("incrementAsync.pending");
  //       })
  //       .addCase(
  //         incrementAsync.fulfilled,
  //         (state, action: PayloadAction<number>) => {
  //           state.value += action.payload;
  //         }
  //       );
  //   },
});

// export const incrementAsync = createAsyncThunk(
//   "counter/incrementAsync",
//   async (amount: number) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return amount;
//   }
// );

export const { setMethodItem } = methodSlice.actions;

export default methodSlice.reducer;
