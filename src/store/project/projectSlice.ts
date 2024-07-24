import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ProjectItem,
  ContractInstance,
  ContractsState,
} from "@/data/dataTypes";
import { RootState } from "@/store";
import {
  Collection,
  CollectionDataManager,
  FunctionFragmentView,
} from "@bonadocs/core";

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
    contractInstances: [
      // {
      //   chainId: 1,
      //   address: "lkmdslkmsd",
      //   abi: "lkmscklmsdc",
      //   name: "Ethereum",
      //   logo: "https://res.cloudinary.com/dfkuxnesz/image/upload/v1721089362/Ethere_1_m62ob4.svg",
      // },
    ] as ContractInstance[],
  },
];
const initialState = {
  projectItem: {} as ProjectItem,
  contracts: contracts,
  currentContract: contracts[0] as ContractsState,
  projectView: true as boolean,
};

const projectSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setProjectItem: (state, action: PayloadAction<ProjectItem>) => {
      state.projectItem = action.payload;
    },
    setProjectView: (state, action: PayloadAction<boolean>) => {
      state.projectView = action.payload;
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

      state.contracts = newList;
    },
    setCurrentContract: (state, action: PayloadAction<ContractsState>) => {
      state.currentContract = action.payload;
    },
    updateContract: (state, action: PayloadAction<ContractsState>) => {
      let contracts = state.contracts.slice();
      let index = contracts.findIndex(
        (contractItem: ContractsState) => contractItem.id === action.payload.id
      );
      contracts[index] = action.payload;
      state.contracts = contracts;
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
      contracts[index].contractInstances = action.payload;
      state.contracts = contracts;
      console.log(state.contracts);
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
    for (let j = 0; j < contracts[i].contractInstances!.length; j++) {
      if (
        !contracts[i].contractInstances![j].address ||
        !contracts[i].contractInstances![j].abi
      ) {
        return {
          message: "Please fill in all contract instance fields",
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

const createCollection = (collection: string) => {};

export const {
  setProjectItem,
  setProjectView,
  addEmptyContract,
  deleteContract,
  setCurrentContract,
  updateContract,
  updateContractInstances,
} = projectSlice.actions;

export default projectSlice.reducer;
