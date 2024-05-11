import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionItem } from "@/data/dataTypes";
import { CollectionDataManager } from "@bonadocs/core";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  collectionActions: [
    { name: "Swap", documentation: "" },
    { name: "Lend", documentation: "" },
  ] as Array<ActionItem>,
  currentAction: {  } as ActionItem,
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setActiveAction: (state, action: PayloadAction<ActionItem>) => {
      state.currentAction = action.payload;
    },
  },
});

export const updateWorkflowAction = createAsyncThunk(
  "action/updateWorkflowAction",
  async (setWorkflowParams: CollectionDataManager, { getState }) => {
    const state: any = getState();
    const collection = setWorkflowParams;

    // const actionWorkflow = await collection.setWorkflow();
  }
);

export const { setActiveAction } = actionSlice.actions;

export default actionSlice.reducer;
