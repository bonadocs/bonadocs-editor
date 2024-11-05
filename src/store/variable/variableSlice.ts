import { CollectionDataManager } from "@bonadocs/core";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { colorBrewer } from "react-syntax-highlighter/dist/esm/styles/hljs";

type VariableItem = {
  name: string;
  value?: string;
};

interface VariableParams {
  collection: CollectionDataManager;
  variable: VariableItem;
}

interface RenameParams {
  collection: CollectionDataManager;
  oldName: string;
  newName: string;
}

const initialState = {
  collectionVariables: new Array<VariableItem>(),
  currentVariable: {} as VariableItem,
};

const variableSlice = createSlice({
  name: "variable",
  initialState,
  reducers: {
    assignCollectionVariables: (
      state,
      action: PayloadAction<VariableItem[]>
    ) => {
      state.collectionVariables = action.payload;
    },
    setCurrentCollectionVariable: (
      state,
      action: PayloadAction<VariableItem>
    ): void => {
      state.currentVariable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCollectionVariables.pending, (state) => {})
      .addCase(
        updateCollectionVariables.fulfilled,
        (state, action: PayloadAction<any | undefined>) => {
          if (!action.payload) {
            return;
          }
          const variableList = action.payload;
          const collectionVariables = Array.from(
            variableList,
            ([name, value]) => ({
              name,
              value,
            })
          );

          state.collectionVariables = collectionVariables;
        }
      );

    builder
      .addCase(renameVariable.pending, () => {})
      .addCase(
        renameVariable.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (!action.payload) {
            return;
          }
          const variableList = action.payload;
          const collectionVariables = Array.from(
            variableList,
            ([name, value]) => ({
              name,
              value,
            })
          );

          state.collectionVariables = collectionVariables;
        }
      );

    builder
      .addCase(deleteVariable.pending, () => {})
      .addCase(
        deleteVariable.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (!action.payload) {
            return;
          }
          const variableList = action.payload;
          const collectionVariables = Array.from(
            variableList,
            ([name, value]) => ({
              name,
              value,
            })
          );

          state.collectionVariables = collectionVariables;
        }
      );
  },
});

export const fetchCollectionVariables = createAsyncThunk(
  "variable/fetchCollectionVariables",
  async (collection: CollectionDataManager, { dispatch }) => {
    const variableList = (await collection.getEnvironmentManagerView()).list;
    const collectionVariables = Array.from(variableList, ([name, value]) => ({
      name,
      value,
    }));

    dispatch(assignCollectionVariables(collectionVariables));
  }
);

export const getCollectionVariable = createAsyncThunk(
  "variable/getCollectionVariable",
  async (variableParams: VariableParams, { dispatch }) => {
    const { collection, variable } = variableParams;
    const collectionVariable = (
      await collection.getEnvironmentManagerView()
    ).getVariable(variable.name);

    dispatch(
      setCurrentCollectionVariable({
        name: variable.name,
        value: collectionVariable,
      })
    );
  }
);

export const updateCollectionVariables = createAsyncThunk(
  "variable/updateCollectionVariable",
  async (variableData: VariableParams) => {
    const { collection, variable } = variableData;
    if (!collection) {
      return;
    }
    try {
      await (
        await collection.getEnvironmentManagerView()
      ).setVariable(variable.name, variable.value || "");
      const environmentView = await collection.getEnvironmentManagerView();

      const variableList = environmentView.list;
      return variableList;
    } catch (err) {}
  }
);

export const renameVariable = createAsyncThunk(
  "variable/renameCollectionVariable",
  async (renameParams: RenameParams) => {
    try {
      if (!renameParams.collection) {
        throw new Error("Collection not found");
      }
      const { collection, oldName, newName } = renameParams;
      await (
        await collection.getEnvironmentManagerView()
      ).renameVariable(oldName, newName);
      const environmentView = await collection.getEnvironmentManagerView();

      const variableList = environmentView.list;
      return variableList;
    } catch (error) {
      console.error("renameVariable", error);
    }
  }
);

export const deleteVariable = createAsyncThunk(
  "variable/deleteCollectionVariable",
  async (variableParams: VariableParams) => {
    try {
      if (!variableParams.collection) {
        throw new Error("Collection not found");
      }
      const { collection, variable } = variableParams;
      (await collection.getEnvironmentManagerView()).deleteVariable(
        variable.name
      );

      const environmentView = await collection.getEnvironmentManagerView();

      const variableList = environmentView.list;
      return variableList;
    } catch (error) {
      console.error("renameVariable", error);
    }
  }
);

export const { assignCollectionVariables, setCurrentCollectionVariable } =
  variableSlice.actions;

export default variableSlice.reducer;
