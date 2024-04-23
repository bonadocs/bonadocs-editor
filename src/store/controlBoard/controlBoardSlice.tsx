import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { playgroundState } from "@/data/dataTypes";
import { BrowserProvider } from "ethers";
import { RootState } from "@/store";
const initialState = {
  writeMethod: false as boolean,
  playgroundState: "interaction" as playgroundState,
  simulation: false as boolean,
  provider: null as BrowserProvider | null,
  chainId: null as number | null,
  connected: false as boolean,
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
    setSimulation: (state, action: PayloadAction<boolean>) => {
      state.simulation = action.payload;
    },
    setProvider: (state, action: PayloadAction<BrowserProvider | null>) => {
      state.provider = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setChainId: (state, action: PayloadAction<number | null>) => {
      state.chainId = action.payload;
    },
    toggleOverlay: (
      state,
      action: PayloadAction<{
        toogleState: boolean;
        overlayRef: HTMLDivElement;
      }>
    ) => {
      const { toogleState, overlayRef } = action.payload;
      toogleState
        ? (overlayRef.style.display = "flex")
        : (overlayRef.style.display = "none");
    },
  },
});

export const selectButtonText = (state: RootState) => {
  return state.method.methodItem.readMethod
    ? `Query`
    : !state.controlBoard.simulation
    ? state.controlBoard.connected
      ? `Query`
      : `Connect Wallet`
    : `Query`;
};

export const {
  setWriteMethod,
  setPlaygroundState,
  setSimulation,
  setProvider,
  setConnected,
  setChainId,
  toggleOverlay,
} = controlBoardSlice.actions;

export default controlBoardSlice.reducer;
