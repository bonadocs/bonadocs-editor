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
import { api } from "@/utils/axios";

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
  editContracts: [] as ContractsState[],
  currentContract: contracts[0] as ContractsState,
  projectView: true as boolean,
  projectList: [] as Array<ProjectItem>,
  currentTeamProjectId: "" as string,
};

interface SaveProjectParams {
  collection: CollectionDataManager;
  projectId: string;
}

interface updateContractListParams {
  contracts: ContractsState[];
  collection: CollectionDataManager;
  uriId?: string;
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: () => initialState,
    setProjectItem: (state, action: PayloadAction<ProjectItem>) => {
      state.projectItem = action.payload;
    },
    setProjectList: (state, action: PayloadAction<ProjectItem[]>) => {
      state.projectList = action.payload;
    },
    setCurrentTeamProjectId: (state, action: PayloadAction<string>) => {
      state.currentTeamProjectId = action.payload;
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
    setContracts: (state, action: PayloadAction<ContractsState[]>) => {
      state.contracts = action.payload;
      
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
      if (
        !contracts[i].contractInstances![j].address ||
        contracts[i].contractInstances![j].address.length !== 42
      ) {
        return {
          message:
            "Please fill in the correct contract address for all contract instance",
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
    dispatch(setContracts(contracts));

    return contracts;
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (projectItem: ProjectItem, { getState, dispatch }) => {
    const { team } = getState() as RootState;
    try {
      const projectUpdate = await api.put(
        `projects/${team.currentTeam.id}/collections/${projectItem.id}`,
        {
          name: projectItem.name,
          isPublic: true,
        }
      );

      const projectData = await api.get(
        `projects/${team.currentTeam.id}/collections/${projectItem.id}/data`
      );

      // return projects.data.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return false;
    }
  }
);

export const getProjectData = createAsyncThunk(
  "project/getProjectData",
  async (projectItem: ProjectItem, { getState, dispatch }) => {
    const { team } = getState() as RootState;
    try {
      const projectData = await api.get(
        `projects/${team.currentTeam.id}/collections/${projectItem.id}/data`
      );

      // return projects.data.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return false;
    }
  }
);

export const saveProject = createAsyncThunk(
  "project/saveProject",
  async (saveProjectParams: SaveProjectParams, { getState, dispatch }) => {
    const { team } = getState() as RootState;
    const { collection, projectId } = saveProjectParams;
    const collectionName = collection.data.name;

    try {
      const saveToServer = await api.put(
        `projects/${team.currentTeam.id}/collections/${projectId}/sync`,
        {
          name: collectionName,
          isPublic: false,
          collectionData: collection.data,
        }
      );

      // return projects.data.data;
    } catch (err: any) {
      toast.error(`Cannot save project ${err.response.data.message}`);
      return false;
    }
  }
);

export const getProjectLink = createAsyncThunk(
  "project/getProjectLink",
  async (projectItem: ProjectItem, { getState, dispatch }) => {
    const { team } = getState() as RootState;
    try {
      const projectData = await api.get(
        `projects/${team.currentTeam.id}/collections/${projectItem.id}`
      );

      // return projects.data.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return false;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectItem: ProjectItem, { getState, dispatch }) => {
    const { team } = getState() as RootState;
    try {
      await api.delete(
        `projects/${team.currentTeam.id}/collections/${projectItem.id}`
      );

      dispatch(fetchCollections());
      // return projects.data.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return false;
    }
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
        message: "Please add at least one network",
        status: false,
      };
    }

    for (let i = 0; i < contract.contractInstances!.length; i++) {

      if (!contract.contractInstances![i].address) {
        return {
          message:
            "Please fill in the correct contract address for all networks",
          status: false,
        };
      }

      if (contract.contractInstances![i].address.length < 42) {
        return {
          message:
            "Please fill in the correct 42 character contract address for all contract networks",
          status: false,
        };
      }
    }
    return {
      message: "Good to goo",
      status: true,
    };
  }
);

export const importCollection = createAsyncThunk(
  "project/importCollection",
  async (uri: string, { dispatch }) => {
    try {
      const collection = await Collection.createFromIPFS(uri);
      // dispatch(reset());
      // await collection.manager.saveToLocal()

      return collection.manager;
    } catch (err) {
      console.log(err);
      toast.error("Error importing collection");
      return false;
    }
  }
);

export const fetchCollections = createAsyncThunk(
  "project/fetchCollection",
  async (_, { dispatch, getState }) => {
    const { team } = getState() as RootState;
    if (team.currentTeam) {
      try {
        const projects = await api.get(
          `projects/${team.currentTeam.id}/collections`
        );

        dispatch(setProjectList(projects.data.data));
        return projects.data.data;
      } catch (err: any) {
        toast.error(err.response.data.message);
        return false;
      }
    }
  }
);

export const addCollection = createAsyncThunk(
  "project/addCollection",
  async (collectionParam: CollectionDataManager, { dispatch, getState }) => {
    const { team } = getState() as RootState;
    const collectionName = collectionParam.data.name;
    console.log(collectionParam.data);
    try {
      const newProject = await api.post(
        `projects/${team.currentTeam.id}/collections`,
        {
          name: collectionName,
          isPublic: false,
          collectionData: collectionParam.data,
        }
      );

      dispatch(fetchCollections());
      toast.success("Project added successfully");
      return true;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return false;
    }
  }
);

export const editCollectionDetails = createAsyncThunk(
  "project/setCollectionDetails",
  async (collectionDetails: CollectionDetailsParams, { dispatch }) => {
    try {
      const { collection, projectItem, value } = collectionDetails;
      if (projectItem === "name") {
        await collection.metadataView.rename(value);
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
    const { contracts, collection, uriId } = updateContractListParams;
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
      dispatch(fetchCollectionContracts({ collection, uriId }));

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
      const newCollection = Collection.createBlankCollection(
        name,
        description!
      );
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
      const collectionName = newCollectionManager.data.name;
      const newProject = await api.post(
        `projects/${state.team.currentTeam.id}/collections`,
        {
          name: collectionName,
          isPublic: false,
          collectionData: newCollectionManager.data,
        }
      );

      dispatch(reset());
      return newCollectionManager;
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response.data.message);
      return false;
    }
  }
);
export const {
  setProjectItem,
  setProjectView,
  setCurrentTeamProjectId,
  setContracts,
  setProjectList,
  addContract,
  addEmptyContract,
  deleteContract,
  setCurrentContract,
  updateContract,
  updateContractInstances,
  reset,
} = projectSlice.actions;

export default projectSlice.reducer;
