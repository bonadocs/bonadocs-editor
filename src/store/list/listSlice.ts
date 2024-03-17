import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContractMethods {
  name: string;
  type: string;
  displayData: Array<object>;
}

interface Contracts {
  name: string;
  methods: Array<ContractMethods>;
}

const initialState = {
  contractList: [] as Array<Contracts>,
  actions: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    updateContractList: (state, action: PayloadAction<Array<Contracts>>) => {
          state.contractList = action.payload;
          console.log("state.contractList", state.contractList);
          
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

export const { updateContractList } = listSlice.actions;

export default listSlice.reducer;
