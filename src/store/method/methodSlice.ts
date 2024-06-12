import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MethodItem } from "@/data/dataTypes";
import {
  FunctionFragmentView,
  FragmentDisplayData,
  CollectionDataManager,
  TransactionOverrides,
} from "@bonadocs/core";
import { REHYDRATE } from "redux-persist";
import { RootState } from "..";
import { act } from "react";

const initialState = {
  methodItem: {} as MethodItem,
  methodDisplayData: [] as FragmentDisplayData | undefined,
  methodFunctionFragment: {} as FunctionFragmentView,
  transactionOverrides: [] as TransactionOverrides[],
  updateChange: false as boolean,
};

interface FragmentParams {
  collection: CollectionDataManager;
  value?: string;
  path?: string;
  addIndex?: number;
  arrayIndex?: number;
  indexInArray?: number;
  docs?: string;
}
interface UpdateMethodParams {
  collection: CollectionDataManager;
  methodItem: MethodItem;
}

interface UpdateChainIdParams {
  collection: CollectionDataManager;
  chainId: number;
}

const methodSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setMethodItem: (state, action: PayloadAction<MethodItem>) => {
      state.methodItem = action.payload;
    },
    setMethodDisplayData: (
      state,
      action: PayloadAction<FragmentDisplayData>
    ) => {
      state.methodDisplayData = action.payload;
    },
    setTransactionOverrides: (
      state,
      action: PayloadAction<TransactionOverrides[]>
    ) => {
      state.transactionOverrides = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMethodViewValue.pending, () => {})
      .addCase(
        setMethodViewValue.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload) {
            const functionFragment = action.payload;
            state.updateChange = !state.updateChange;
            state.methodDisplayData = functionFragment?.displayData.slice();
          }
        }
      );

    builder
      .addCase(getMethodViewValue.pending, () => {})
      .addCase(
        getMethodViewValue.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {}
      );

    builder
      .addCase(updateMethodViewValue.pending, () => {})
      .addCase(
        updateMethodViewValue.fulfilled,
        (state, action: PayloadAction<MethodItem | undefined>) => {
          state.methodItem = action.payload!;
        }
      );

    builder.addCase(REHYDRATE, (state) => {});
  },
});

export const setMethodViewValue = createAsyncThunk(
  "method/setMethodViewValue",
  async (setFragmentParams: FragmentParams, { getState }) => {
    const state: RootState = getState() as RootState;
    const { collection, value, path, addIndex, indexInArray, arrayIndex } =
      setFragmentParams;

    if (state.method.methodItem.contractId) {
      try {
        const functionFragment = await collection.getFunctionFragmentView(
          state.method.methodItem.contractId!,
          state.method.methodItem.fragmentKey
        );

        if (typeof value !== "undefined" && typeof path !== "undefined") {
          functionFragment?.setDataValue(value, path);
        }

        if (typeof addIndex !== "undefined") {
          await functionFragment?.addArrayItem(addIndex);
        }
        if (
          typeof arrayIndex !== "undefined" &&
          typeof indexInArray !== "undefined"
        ) {
          await functionFragment?.deleteArrayItem(arrayIndex, indexInArray!);
        }
        return functionFragment;
      } catch (err) {
        console.log("err", err);
      }
    }
  }
);

export const updateMethodViewValue = createAsyncThunk(
  "method/updateMethodViewValue",
  async (updateMethodParams: UpdateMethodParams, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { collection, methodItem } = updateMethodParams;
    if (state.method.methodItem.contractId) {
      try {
        const functionFragment = await collection.getFunctionFragmentView(
          state.method.methodItem.contractId!,
          state.method.methodItem.fragmentKey
        );
        const methodDocs = functionFragment?.getDocText();
        const { name, fragmentKey, contractId, instances, readMethod } =
          methodItem;

        return {
          name,
          fragmentKey,
          contractId,
          instances,
          docs: methodDocs,
          readMethod,
        };
      } catch (err) {
        console.log(err);
      }
    }
  }
);

export const getMethodViewValue = createAsyncThunk(
  "method/getMethodViewValue",
  async (setFragmentParams: FragmentParams, { getState }) => {
    const state = getState() as RootState;
    const { collection, path } = setFragmentParams;
    if (state.method.methodItem.contractId) {
      try {
        const functionFragment = await collection.getFunctionFragmentView(
          state.method.methodItem.contractId!,
          state.method.methodItem.fragmentKey
        );
        const viewValue = functionFragment?.getDataValue(path);

        return viewValue;
      } catch (err) {
        console.log(err);
      }
    }
  }
);

export const setMethodViewDocs = createAsyncThunk(
  "method/setMethodViewDocs",
  async (setFragmentParams: FragmentParams, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { collection, docs } = setFragmentParams;
    const functionFragment = await collection.getFunctionFragmentView(
      state.method.methodItem.contractId!,
      state.method.methodItem.fragmentKey
    );
    await functionFragment?.setDocText(docs!);
    dispatch(setMethodItem({ ...state.method.methodItem, docs }));
  }
);

export const { setMethodItem, setTransactionOverrides, setMethodDisplayData } =
  methodSlice.actions;

export default methodSlice.reducer;
