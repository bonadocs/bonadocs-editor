import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ProjectItem,
  ContractInstance,
  ContractsState,
  CollectionDetailsParams,
} from "@/data/dataTypes";
import { RootState } from "@/store";
import {
  Collection,
  CollectionDataManager,
  ContractDefinition,
} from "@bonadocs/core";
import { toast } from "react-toastify";
import { fetchCollectionContracts } from "../contract/contractSlice";

const emptyContract = {
  id: "0",
  name: "",
  interfaceHash: "",
  instances: [],
};

const contracts: ContractsState[] = [
  {
    ...emptyContract,
    description: "",
    abi: "",
    contractInstances: [] as ContractInstance[],
  },
];
const initialState = {
  projectItem: {} as ProjectItem,
  contracts: contracts,
  currentContract: contracts[0] as ContractsState,
  projectView: true as boolean,
};

interface updateContractListParams {
  contracts: ContractsState[];
  collection: CollectionDataManager;
}

const projectSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    reset: () => initialState,
    setProjectItem: (state, action: PayloadAction<ProjectItem>) => {
      state.projectItem = action.payload;
    },
    setProjectView: (state, action: PayloadAction<boolean>) => {
      state.projectView = action.payload;
    },
    addContract: (state, action: PayloadAction<ContractsState>) => {
      const chars = "0123456789abcdef";
      let contractItem = { ...action.payload };
      contractItem.id =
        "0x" +
        Array.from(
          { length: 5 },
          () => chars[Math.floor(Math.random() * chars.length)]
        ).join("");

      state.contracts.push(contractItem);
    },
    addEmptyContract: (state) => {
      let contractItem = { ...contracts[0] };
      let lastItem = state.contracts.slice(-1).pop();
      contractItem.id = (Number(lastItem?.id) + 1).toString();

      state.contracts.push(contractItem);
    },
    deleteContract: (state, action: PayloadAction<number>) => {
      let contracts = state.contracts.slice();
      contracts.splice(action.payload, 1);
      console.log("contracts", contracts);

      let newList = contracts.map(
        (contractItem: ContractsState, index: number) => {
          return (contractItem.id = index.toString()), contractItem;
        }
      );
      console.log(newList);

      state.contracts = newList;
    },
    setCurrentContract: (state, action: PayloadAction<ContractsState>) => {
      state.currentContract = action.payload;
    },
    setContracts: (state, action: PayloadAction<ContractsState[]>) => {
      state.contracts = action.payload;
      console.log(state.contracts);
    },
    updateContract: (state, action: PayloadAction<ContractsState>) => {
      let contracts = state.contracts.slice();
      let index = contracts.findIndex(
        (contractItem: ContractsState) => contractItem.id === action.payload.id
      );
      contracts[index] = action.payload;
      state.contracts = contracts;
      console.log(state.contracts);
    },
    updateContractInstances: (
      state,
      action: PayloadAction<ContractInstance[]>
    ) => {
      let contracts = state.contracts.slice();
      let index = contracts.findIndex(
        (contractItem: ContractsState) =>
          contractItem.id === state.currentContract.id
      );

      console.log(action.payload, "contracts", index);
      contracts[index].contractInstances = action.payload;
      state.contracts = contracts;
      console.log(contracts);
    },
  },
  extraReducers: (builder) => {},
});

export const projectFilled = (state: RootState) => {
  return (
    !state?.project?.projectItem?.name ||
    !state?.project?.projectItem?.description
  );
};

export const projectValidation = (state: RootState) => {
  if (projectFilled(state)) {
    return {
      message: "Please fill in all project fields",
      status: false,
    };
  }
  const contracts = state.project.contracts;
  for (let i = 0; i < contracts.length; i++) {
    if (!contracts[i].name || !contracts[i].description) {
      return {
        message: "Please fill in all contract names and descriptions",
        status: false,
      };
    }
    if (contracts[i].contractInstances?.length === 0) {
      return {
        message: "Please add at least one contract instance",
        status: false,
      };
    }

    if (!contracts[i].abi) {
      return {
        message: "Please add contract ABI",
        status: false,
      };
    }

    for (let j = 0; j < contracts[i].contractInstances!.length; j++) {
      if (!contracts[i].contractInstances![j].address) {
        return {
          message:
            "Please fill in the contract address for all contract instance",
          status: false,
        };
      }
    }
  }
  return {
    message: "Good to go",
    status: true,
  };
};

export const deletePlaygroundContract = createAsyncThunk(
  "project/deletePlaygroundContract",
  (contractIndex: number, { getState, dispatch }): ContractsState[] => {
    const state = getState() as RootState;
    let contracts = state.project.contracts.slice();
    contracts.splice(contractIndex, 1);
    console.log("contracts", contracts);

    dispatch(setContracts(contracts));

    return contracts;
  }
);

export const addPlaygroundContractValidation = createAsyncThunk(
  "project/addPlaygroundContractValidation",
  (
    contract: ContractsState,
    { getState }
  ): { message: string; status: boolean } | undefined => {
    if (!contract.name || !contract.description) {
      return {
        message: "Please fill in the contract name and description",
        status: false,
      };
    }

    if (!contract.abi || contract.abi === "") {
      return {
        message: "Please add contract ABI",
        status: false,
      };
    }

    if (
      contract.contractInstances?.length === 0 ||
      !contract.contractInstances
    ) {
      return {
        message: "Please add at least one contract instance",
        status: false,
      };
    }

    for (let i = 0; i < contract.contractInstances!.length; i++) {
      if (!contract.contractInstances![i].address) {
        return {
          message:
            "Please fill in the contract address for all contract instance",
          status: false,
        };
      }
    }
    return {
      message: "Good to go",
      status: true,
    };
  }
);

export const importCollection = createAsyncThunk(
  "project/importCollection",
  async (uri: string, { dispatch }) => {
    try {
      const collection = await Collection.createFromIPFS(uri);
      dispatch(reset());
      // await collection.manager.saveToLocal()
      return collection.manager;
    } catch (err) {
      console.log(err);
      toast.error("Error importing collection");
    }
  }
);

export const editCollectionDetails = createAsyncThunk(
  "project/setCollectionDetails",
  async (collectionDetails: CollectionDetailsParams, { dispatch }) => {
    try {
      console.log(collectionDetails);

      const { collection, projectItem, value } = collectionDetails;
      if (projectItem === "name") {
        await collection.metadataView.rename(value);
        console.log("renamed");
      } else {
        await collection.metadataView.updateDescription(value);
      }
      // collection.manager.setDocText(projectItem.description);
      // dispatch(setProjectItem(projectItem));
    } catch (err) {
      console.log(err);
      toast.error("Error editing collection name/description");
    }
  }
);

export const updateContractList = createAsyncThunk(
  "project/updateContractList",
  async (
    updateContractListParams: updateContractListParams,
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;
    const collectionContracts = state.contract.collectionContracts;
    const { contracts, collection } = updateContractListParams;
    const contractManagerView = collection.contractManagerView;
    try {
      for (let i = 0; i < collectionContracts.length; i++) {
        await contractManagerView.removeContract(
          collectionContracts[i].contractId
        );
      }

      for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i];

        const interfaceHash = await contractManagerView.addContractInterface(
          contract.name,
          contract.abi!
        );

        const instances = contract.contractInstances?.map((instance) => {
          return {
            chainId: instance.chainId,
            address: instance.address,
          };
        });

        const contractDefinitionParam: ContractDefinition = {
          id: contract.id,
          name: contract.name,
          interfaceHash: interfaceHash,
          instances: instances!,
        };
        console.log("get here");
        console.log(
          contractDefinitionParam,
          "param",
          instances![0].chainId,
          instances![0].address
        );

        if (contractManagerView && instances![0]) {
          await contractManagerView.addContract(
            contractDefinitionParam,
            instances![0].chainId,
            instances![0].address
          );
        }

        await collection
          .getContractDetailsView(contract.id)
          .setDocText(contract.description!);
      }
      dispatch(fetchCollectionContracts(collection));
      return true;
    } catch (err) {
      console.log(err);

      toast.error("Error updating contract list");
      return false;
    }
  }
);

export const createCollection = createAsyncThunk(
  "project/createCollection",
  async (_: void, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { name, description } = state.project.projectItem;
    const chars = "0123456789abcdef";
    try {
      const newCollection = Collection.createBlankCollection(name, description);
      const contractManagerView = newCollection.manager.contractManagerView;

      for (let i = 0; i < state.project.contracts.length; i++) {
        const contract = state.project.contracts[i];
        const interfaceHash = await contractManagerView.addContractInterface(
          state.project.contracts[i].name,
          state.project?.contracts[i]?.abi || ""
        );
        const instances =
          state.project.contracts[i].contractInstances?.map((instance) => {
            return {
              chainId: instance.chainId,
              address: instance.address,
            };
          }) ?? [];

        const contractId =
          "0x" +
          Array.from(
            { length: 5 },
            () => chars[Math.floor(Math.random() * chars.length)]
          ).join("");
        const contractDefinitionParam: ContractDefinition = {
          id: contractId,
          name: contract.name,
          interfaceHash: interfaceHash,
          instances: instances ?? [],
        };
        contractManagerView.addContract(
          contractDefinitionParam,
          instances[0].chainId,
          instances[0].address
        );
        newCollection.manager
          ?.getContractDetailsView(contractId)
          .setDocText(contract.description!);
      }
      const newCollectionManager: CollectionDataManager = newCollection.manager;
      // newCollectionManager.metadataView.updateDescription(description);
      // await newCollectionManager.saveToLocal();
      dispatch(reset());
      return newCollectionManager;
    } catch (err) {
      console.log(err);
      toast.error("Error creating collection");
    }
  }
);
export const {
  setProjectItem,
  setProjectView,
  setContracts,
  addContract,
  addEmptyContract,
  deleteContract,
  setCurrentContract,
  updateContract,
  updateContractInstances,
  reset,
} = projectSlice.actions;

export default projectSlice.reducer;
