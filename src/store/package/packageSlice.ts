import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  writeMethod: false as boolean,
  collectionPackages: [
    { name: "ethers" },
    { name: "Metamask" },
    { name: "ccxt" },
    { name: "ChainSafe" },
  ] as Array<any>,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
});

export const {} = packageSlice.actions;

export default packageSlice.reducer;
