import { CollectionDataManager } from "@bonadocs/core";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MethodItem } from "@/data/dataTypes";
import { FunctionFragment } from "ethers";
import { ContractItem, ContractItemDocs } from "@/data/dataTypes";
import { REHYDRATE } from "redux-persist";
import { RootState } from "..";
import { act } from "react";

const initialState = {
  collectionContracts: [] as Array<ContractItem>,
  currentContract: {} as ContractItem,
  contractEdit: false as boolean,
};

interface ContractsDocsParams {
  collection: CollectionDataManager;
  docs: string;
}

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setActiveContract: (state, action: PayloadAction<ContractItem>) => {
      state.currentContract = action.payload;
    },
    setContractEdit: (state, action: PayloadAction<boolean>) => {
      state.contractEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {});

    builder
      .addCase(fetchCollectionContracts.pending, () => {})
      .addCase(
        fetchCollectionContracts.fulfilled,
        (state, action: PayloadAction<ContractItem[]>) => {
          const collectionContracts = action.payload;
          state.collectionContracts = collectionContracts;
        }
      );

    builder
      .addCase(getActiveContractDocs.pending, () => {})
      .addCase(
        getActiveContractDocs.fulfilled,
        (state, action: PayloadAction<string>) => {
          const contractDocs = action.payload;
          // state.viewDocs = contractDocs
          state.currentContract.docs = contractDocs;
        }
      );
  },
});

export const fetchCollectionContracts = createAsyncThunk(
  "contract/fetchCollectionContracts",
  async (
    setWorkflowParams: { collection: CollectionDataManager; uriId?: string },
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    const { collection, uriId } = setWorkflowParams;
    const collectionContracts: Array<ContractItem> = [];
    const contractList = [...collection?.data.contracts].map(
      ({ name, id, instances }) => ({
        name,
        contractId: id,
        instances,
      })
    );
    const queryParams = new URLSearchParams(window.location.search);

    for (const contract of contractList) {
      let contractMethods = collection?.getContractDetailsView(
        contract.contractId
      ).functions;

      let contractDocs = await collection
        ?.getContractDetailsView(contract.contractId)
        .getDocText();

      const methodItem: Array<MethodItem> = [];
      contractMethods.forEach((method) => {
        methodItem.push({
          name: method.fragment.name,
          fragmentKey: method.fragmentKey,
          readMethod:
            (method.fragment as FunctionFragment).stateMutability === "view" ||
            (method.fragment as FunctionFragment).stateMutability === "pure"
              ? true
              : false,
        });
      });

      collectionContracts.push({
        name: contract.name,
        contractId: contract.contractId,
        methodItem,
        docs: contractDocs ?? "",
        instances: contract.instances,
        uri: queryParams.get("uri") ?? uriId,
      });
    }
    dispatch(setContractEdit(!state.contract.contractEdit));
    return collectionContracts;
  }
);

export const setContractDocs = createAsyncThunk(
  "contract/setContractDocs",
  async (setContractDocsParams: ContractItemDocs, { dispatch, getState }) => {
    const { collection, docs, contractId } = setContractDocsParams;
    const state = getState() as RootState;
    await collection?.getContractDetailsView(contractId).setDocText(docs!);
    dispatch(
      setActiveContract(
        Object.assign({}, state.contract.currentContract, { docs })
      )
    );
  }
);

export const updateActiveContractDocs = createAsyncThunk(
  "contract/updateActiveContractDocs",
  async (
    setContractDocsParams: ContractsDocsParams,
    { dispatch, getState }
  ) => {
    const { collection, docs } = setContractDocsParams;
    const state = getState() as RootState;
    let contractDocs = await collection
      ?.getContractDetailsView(state.contract.currentContract.contractId)
      .setDocText(docs);
  }
);

export const getActiveContractDocs = createAsyncThunk(
  "contract/getActiveContractDocs",
  async (
    setContractDocsParams: CollectionDataManager,
    { dispatch, getState }
  ) => {
    const collection = setContractDocsParams;
    const state = getState() as RootState;
    let contractDocs = await collection
      ?.getContractDetailsView(state.contract.currentContract.contractId)
      .getDocText();
    return contractDocs;
  }
);

export const { setActiveContract, setContractEdit } = contractSlice.actions;

export default contractSlice.reducer;
