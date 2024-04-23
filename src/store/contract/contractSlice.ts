import { CollectionDataManager } from "@bonadocs/core";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MethodItem } from "@/data/dataTypes";
import { FunctionFragment } from "ethers";
import { ContractItem } from "@/data/dataTypes";
import { REHYDRATE } from "redux-persist";

const initialState = {
  collectionContracts: [] as Array<ContractItem>,
  currentContract: {} as ContractItem,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    fetchCollectionContracts: (
      state,
      action: PayloadAction<CollectionDataManager>
    ) => {
      const collection = action.payload;
      const collectionContracts: Array<ContractItem> = [];
      const contractList = [...collection?.data.contracts].map(
        ({ name, id, instances }) => ({
          name,
          contractId: id,
          instances,
        })
      );
      const queryParams = new URLSearchParams(window.location.search);
      contractList.forEach((contract, i) => {
        let contractMethods = collection?.getContractDetailsView(
          contract.contractId
        ).functions;

        const methodItem: Array<MethodItem> = [];
        contractMethods.forEach((method) => {
          methodItem.push({
            name: method.fragment.name,
            fragmentKey: method.fragmentKey,
            readMethod:
              (method.fragment as FunctionFragment).stateMutability ===
                "view" ||
              (method.fragment as FunctionFragment).stateMutability === "pure"
                ? true
                : false,
          });
        });

        collectionContracts.push({
          name: contract.name,
          contractId: contract.contractId,
          methodItem,
          instances: contract.instances,
          uri: queryParams.get("uri")!,
        });
      });
      console.log(collectionContracts, "collectionContracts");
      
      state.collectionContracts = collectionContracts;
    },
    setActiveContract: (state, action: PayloadAction<ContractItem>) => {
      state.currentContract = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
    });
  },
});

export const { fetchCollectionContracts, setActiveContract } =
  contractSlice.actions;

export default contractSlice.reducer;
