import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { playgroundState } from "@/data/dataTypes";
import { BrowserProvider } from "ethers";
import { RootState } from "@/store";
import { ethers } from "ethers";
const initialState = {
  writeMethod: false as boolean,
  playgroundState: "interaction" as playgroundState,
  simulation: false as boolean,
  provider: undefined as BrowserProvider | undefined,
  chainId: null as number | null,
  connected: false as boolean,
  packagesView: false as boolean,
  cloudIcon: false as boolean,
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
    setProvider: (state, action: PayloadAction<BrowserProvider | undefined>) => {
      state.provider = action.payload;
    },
    setPackagesView: (state, action: PayloadAction<boolean>) => {
      state.packagesView = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setChainId: (state, action: PayloadAction<number | null>) => {
      state.chainId = action.payload;
    },
    setCloudIcon: (state, action: PayloadAction<boolean>) => {
      state.cloudIcon = action.payload;
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

export const methodButtonText = (state: RootState) => {
  return state.method.methodItem.readMethod
    ? `Query`
    : !state.controlBoard.simulation
    ? state.controlBoard.connected
      ? `Query`
      : `Connect Wallet`
    : `Query`;
};

export const workflowButtonText = (state: RootState) => {
  return state.controlBoard.simulation
    ? `Run`
    : state.controlBoard.connected
    ? `Run`
    : `Run`; // connect wallet state will be here
};

export const {
  setWriteMethod,
  setPlaygroundState,
  setPackagesView,
  setSimulation,
  setProvider,
  setConnected,
  setChainId,
  toggleOverlay,
  setCloudIcon
} = controlBoardSlice.actions;

export default controlBoardSlice.reducer;
