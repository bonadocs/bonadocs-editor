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
    fetchCollectionVariables: (
      state,
      action: PayloadAction<CollectionDataManager>
    ) => {
      const variableList = action.payload.environmentManagerView.list;
      const collectionVariables = Array.from(variableList, ([name, value]) => ({
        name,
        value,
      }));
      
      state.collectionVariables = collectionVariables;
    },
    getCollectionVariable: (
      state,
      action: PayloadAction<VariableParams>
    ): void => {
      const { collection, variable } = action.payload;
      const collectionVariable = collection.environmentManagerView.getVariable(
        variable.name
      );
      state.currentVariable = {
        name: variable.name,
        value: collectionVariable,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCollectionVariables.pending, (state) => {
      })
      .addCase(
        updateCollectionVariables.fulfilled,
        (state, action: PayloadAction<CollectionDataManager | undefined>) => {
          if (!action.payload) {
            return;
          }
          const variableList = action.payload.environmentManagerView.list;
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
      .addCase(renameVariable.pending, () => {
      })
      .addCase(
        renameVariable.fulfilled,
        (state, action: PayloadAction<CollectionDataManager | undefined>) => {
          if (!action.payload) {
            return;
          }
          const variableList = action.payload.environmentManagerView.list;
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
      .addCase(deleteVariable.pending, () => {
      })
      .addCase(
        deleteVariable.fulfilled,
        (state, action: PayloadAction<CollectionDataManager | undefined>) => {
          if (!action.payload) {
            return;
          }
          const variableList = action.payload.environmentManagerView.list;
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

export const updateCollectionVariables = createAsyncThunk(
  "variable/updateCollectionVariable",
  async (variableData: VariableParams) => {
    const { collection, variable } = variableData;
    if (!collection) {

      return;
    }
    try {
      await collection.environmentManagerView.setVariable(
        variable.name,
        variable.value || ""
      );
      return collection;
    } catch (err) {
     
    }
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
      collection.environmentManagerView.renameVariable(oldName, newName);
      return collection;
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
      collection.environmentManagerView.deleteVariable(variable.name);
      return collection;
    } catch (error) {
      console.error("renameVariable", error);
    }
  }
);

export const { fetchCollectionVariables, getCollectionVariable } =
  variableSlice.actions;

export default variableSlice.reducer;
