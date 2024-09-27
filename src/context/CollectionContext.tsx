"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import {
  Collection,
  CollectionDataManager,
  FunctionFragmentView,
} from "@bonadocs/core";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";
import { fetchCollectionContracts } from "@/store/contract/contractSlice";
import { fetchCollectionVariables } from "@/store/variable/variableSlice";
import {
  setConnected,
  setProvider,
} from "@/store/controlBoard/controlBoardSlice";
import { useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import {
  methodButtonText,
  workflowButtonText,
} from "@/store/controlBoard/controlBoardSlice";
import { toast } from "react-toastify";
import { RootState } from "../store/index";
import { teamRoles } from "@/data/team/TeamRoles";
import {
  FunctionExecutor,
  DisplayResult,
  ExecutionResult,
  CodeWorkflowExecutor,
} from "@bonadocs/core";
import { setLoader } from "@/store/action/actionSlice";
import { api } from "@/utils/axios";
import { auth } from "@/utils/firebase.utils";
import { getTeamById } from "@/store/team/teamSlice";

// Create the context props
interface CollectionContextProps {
  initializeEditor: (editorParam: {
    uri?: string;
    projectId?: string;
    teamId?: string;
  }) => Promise<string | undefined>; // Update the type to include Promise
  collection: CollectionDataManager | null;
  getCollection: () => CollectionDataManager | null;
  setCollection: (collection: CollectionDataManager) => void;
  showResult: boolean;
  executionButton: (overlayRef: HTMLDivElement) => void;
  executionWorkflowButton: () => void;
  walletId: number | undefined;
  response: Array<DisplayResult | ExecutionResult>;
  workflowResponse: any;
  setWorkflowResponse: (resp: string) => void;
  emptyResponse: () => void;
  connectWallet: () => void;
  reloadFunction: () => void;
}

// Create the context
const CollectionContext = createContext<CollectionContextProps | undefined>(
  undefined
);

// Create a custom hook to consume the context
export const useCollectionContext = (): CollectionContextProps => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

interface CollectionProviderProps {
  children: React.ReactNode;
}
// Create the provider component
export const CollectionProvider: React.FC<CollectionProviderProps> = ({
  children,
}) => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const collectionRef = useRef<CollectionDataManager | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const displayButton = useSelector(methodButtonText);
  const workflowButton = useSelector(workflowButtonText);
  const methodItem = useSelector((state: RootState) => state.method.methodItem);
  const [walletId, setWalletId] = useState<number>();
  const [value, setValue] = useState(0);
  const [queryParameters] = useSearchParams();
  const currentUserEmail = useSelector((state: RootState) => state.auth.email);

  const uri = queryParameters.get("uri");
  const id = queryParameters.get("id");
  const writeMethod = useSelector(
    (state: RootState) => state.controlBoard.writeMethod
  );
  const simulation = useSelector(
    (state: RootState) => state.controlBoard.simulation
  );
  const fragmentKey = useSelector(
    (state: RootState) => state.method.methodItem.fragmentKey
  );
  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );
  const [response, setResponse] = useState<
    Array<DisplayResult | ExecutionResult>
  >([]);
  const [workflowResponse, setWorkflowResponse] = useState<any>("");
  const chainId = useSelector((state: RootState) => state.controlBoard.chainId);
  const transactionOverrides = useSelector(
    (state: RootState) => state.method.transactionOverrides
  );

  // const provider = new ethers.BrowserProvider((window as any).ethereum);

  const loadCollectionFromUri = async (uri: string) => {
    try {
      if (localStorage.getItem(uri)) {
        let collection = await Collection.createFromLocalStore(
          localStorage.getItem(uri)!
        );

        collectionRef.current = collection.manager;
        
      } else {
        let collection = await Collection.createFromURI(uri);

        await collection.manager.saveToLocal();
        collectionRef.current = collection.manager;
        

        localStorage.setItem(uri, collectionRef.current?.data.id);
      }
      return true;
    } catch (error: any) {
      toast.error(error);
    }
  };

  function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    // First, check if they have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Create sets from both arrays
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    // Check if both sets have the same size
    if (set1.size !== set2.size) {
      return false;
    }

    // Check if every element in set1 is also in set2
    for (let element of set1) {
      if (!set2.has(element)) {
        return false;
      }
    }

    return true;
  }

  const loadCollectionFromPrivateTeam = async (
    teamId: string,
    projectId: string
  ) => {
    try {
      const uriId = `/projects/${teamId}/collections/${projectId}`;

      const teamUsers = await dispatch(getTeamById(teamId));

      const userPermission = teamUsers.payload.users.find(
        (user: any) => user.emailAddress === currentUserEmail
      )?.permissions;

      const userRole = teamRoles.filter((role) => {
        if (arraysEqual(role.permission, userPermission)) {
          return role;
        }
      });
      // console.log(userRole, "userRole");

      // && userRole[0].value !== "viewer"
      if (localStorage.getItem(uriId)) {
        let collection = await Collection.createFromLocalStore(
          localStorage.getItem(uriId)!
        );

        collectionRef.current = collection.manager;
      } else {
        const getData = await api.get(
          `/projects/${teamId}/collections/${projectId}/data`
        );

        const collection = new CollectionDataManager(getData.data.data);
        await collection.saveToLocal();
        collectionRef.current = collection;

        // if (localStorage.getItem(uriId)!) {
        //   localStorage.removeItem(uriId);
        // }
        localStorage.setItem(uriId, collectionRef.current?.data.id!);
      }

      return true;
    } catch (error) {
      console.log(error);

      toast.error((error as Error).toString());
    }
  };

  const reloadFunction = () => {
    // Function logic here
    setValue((prev) => prev + 1);
  };

  const emptyResponse = () => {
    setResponse([]);
  };

  // const checkLocalCollection = async (uri: string) => {
  //   try {
  //     const db = await openDB("metadata", 1);
  //     const store = db.transaction("index").objectStore("index");

  //     const metadataKey = uri.slice(0, 4) + "-data:" + uri.slice(7);
  //     const value = await store.get(metadataKey);
  //     const collectionIndex = (await openDB("collections", 1))
  //       .objectStoreNames[0];
  //     const isValuePresent = value && collectionIndex ? true : false;
  //     return isValuePresent;
  //   } catch (err) {
  //     return false;
  //   }
  // };

  const getCollection = () => collectionRef.current;
  const setCollection = (collection: CollectionDataManager) => {
    collectionRef.current = collection;
  };

  const initializeEditor = async (editorParam: {
    uri?: string;
    projectId?: string;
    teamId?: string;
  }) => {
    const { uri, projectId, teamId } = editorParam;
    let uriId;
    if (uri) {
      const loadFromUri = await loadCollectionFromUri(uri);
     

      if (loadFromUri !== true) {
        throw new Error("Collection not loaded");
      }

      // if (auth.currentUser !== null) {
      //  uriId = `/projects/${teamId}/collections/${projectId}${auth.currentUser.email}`;
      // // initialConnection();
      // // dispatch(
      // //   fetchCollectionContracts({ collection: collectionRef.current!, uriId })
      // // );
      // //   dispatch(fetchCollectionVariables(collectionRef.current!));
      // // }

      // initialConnection();
      // dispatch(
      //   fetchCollectionContracts({ collection: collectionRef.current! })
      // );
      // dispatch(fetchCollectionVariables(collectionRef.current!));
    } else if (projectId && teamId) {
      

      await loadCollectionFromPrivateTeam(teamId, projectId);

      // console.log(
      //   await api.put(`/projects/${teamId}/collections/${projectId}`, {
      //     name: "Aave v3 - Optimism Market",
      //     isPublic: true,
      //   })
      // );

      // if (privateRes) {
      //   if (!collectionRef.current) {
      //     throw new Error("Collection not loaded");
      //   }
      //   if (auth.currentUser !== null) {
      //     uriId = `/projects/${teamId}/collections/${projectId}${auth.currentUser.email}`;
      //     initialConnection();
      //     dispatch(
      //       fetchCollectionContracts({ collection: collectionRef.current!, uriId })
      //     );
      //     dispatch(fetchCollectionVariables(collectionRef.current!));
      //   }
      //   initialConnection();
      //   dispatch(fetchCollectionContracts({ collection: collectionRef.current! }));
      //   dispatch(fetchCollectionVariables(collectionRef.current!));
      // }
    }

    if (!collectionRef.current) {
      throw new Error("Collection not loaded");
    }

    // if (auth.currentUser !== null) {
    //  uriId = `/projects/${teamId}/collections/${projectId}${auth.currentUser.email}`;
    // // initialConnection();
    // // dispatch(
    // //   fetchCollectionContracts({ collection: collectionRef.current!, uriId })
    // // );
    // //   dispatch(fetchCollectionVariables(collectionRef.current!));
    // // }

    initialConnection();
    dispatch(fetchCollectionContracts({ collection: collectionRef.current! }));
    dispatch(fetchCollectionVariables(collectionRef.current!));
    return uriId!;
    // }
  };

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      dispatch(setConnected(false));
    } else if (accounts[0]) {
      dispatch(setConnected(true));
    }
  }

  function handleChainChanged(chainId: number) {
    if (isNaN(chainId)) {
      throw new Error("Invalid chain ID");
    }
    const wallet =
      String(chainId).slice(0, 2) == "0x"
        ? parseInt(String(chainId), 16)
        : chainId;

    setWalletId(Number(wallet));
  }

  async function checkConnection() {
    (window as any).ethereum
      ?.request({ method: "eth_accounts" })
      .then((accounts: string[]) => handleAccountsChanged(accounts))
      .catch(console.error);
    (window as any).ethereum
      ?.request({ method: "eth_chainId" })
      .then((chainId: string) => handleChainChanged(Number(chainId)))
      .catch(console.error);
  }

  function initialConnection() {
    if (typeof (window as any).ethereum === "undefined") {
      return;
    }

    dispatch(setProvider(new ethers.BrowserProvider((window as any).ethereum)));

    if ((window as any).ethereum) {
      (window as any).ethereum?.on("accountsChanged", handleAccountsChanged);
      (window as any).ethereum?.on("chainChanged", handleChainChanged);
      checkConnection();
    }

    return () => {
      (window as any).ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      (window as any).ethereum?.removeListener(
        "chainChanged",
        handleChainChanged
      );
    };
  }

  const validateInputs = (functionFragment: FunctionFragmentView) => {
    const displayData = functionFragment?.displayData;

    for (let i = 0; displayData && i < displayData.length; i++) {
      const param = displayData[i]; // Add null check here
      if (param?.baseType === "array" || param?.baseType === "tuple") {
        // Add null check here
        continue;
      }

      if (functionFragment?.getDataValue(param?.path) == null) {
        // Add null check here

        return false;
      }
    }

    return true;
  };

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      return;
    }

    (window as any).ethereum
      ?.request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err: Record<string, unknown>) => {
        toast.error(err.toString());
      });
  };

  const executor = async () => {
    return await FunctionExecutor.createFunctionExecutor(
      collectionRef.current!,
      [fragmentKey]
    );
  };

  const workflowExecutor = async () => {
    return await CodeWorkflowExecutor.create(
      collectionRef.current!,
      currentAction.id
    );
  };

  const populateExecutionContext = (methodExecutor: FunctionExecutor) => {
    for (let i = 0; i < transactionOverrides.length; i++) {
      methodExecutor.getExecutionContext(i).overrides = transactionOverrides[i];
    }
  };

  async function setSigner(methodExecutor: FunctionExecutor) {
    if (typeof (window as any).ethereum === "undefined") {
      return;
    }
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider?.getSigner();
    if (signer) {
      methodExecutor.setSigner(signer);
    }
  }

  const toggleOverlay = (toogleState: boolean, overlayRef: HTMLDivElement) => {
    toogleState
      ? (overlayRef.style.display = "flex")
      : (overlayRef.style.display = "none");
  };

  async function executionButton(overlayRef: HTMLDivElement) {
    emptyResponse();
    switch (displayButton) {
      case `Query`:
        const methodExecutor = await executor();

        methodExecutor.setActiveChainId(chainId!);

        const functionFragment =
          await collectionRef.current?.getFunctionFragmentView(
            methodItem.contractId!,
            methodItem.fragmentKey
          );

        if (!validateInputs(functionFragment!)) {
          toast.info("Please fill out all the required fields", {
            toastId: "required-id",
          });
          return;
        }
        toggleOverlay(true, overlayRef);
        if (
          writeMethod &&
          !simulation &&
          walletId !== methodExecutor.activeChainId
        ) {
          toast.info("Please connect to the correct widget network");
          toggleOverlay(false, overlayRef);
          return;
        }

        try {
          let res: Array<DisplayResult | ExecutionResult>;
          populateExecutionContext(methodExecutor);
          if (!simulation) {
            writeMethod && (await setSigner(methodExecutor));

            res = await methodExecutor.execute();
          } else {
            res = await methodExecutor.simulate();
          }
          toggleOverlay(false, overlayRef);
          setResponse(
            res.map((r) => (r instanceof ExecutionResult ? r.simpleData : r))
          );

          setShowResult(true);
        } catch (error) {
          toggleOverlay(false, overlayRef);

          toast.error((error as Error).message);
        }

        break;
      case `Connect Wallet`:
        connectWallet();
        break;
    }
  }

  async function executionWorkflowButton() {
    setWorkflowResponse("");
    const activeNetwork = id?.length !== 0 && id !== null ? Number(id) : 1;
    try {
      dispatch(setLoader(true));
      const executor = await workflowExecutor();

      executor.setActiveChainId(activeNetwork);

      const res = await executor.run();

      setWorkflowResponse(res);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      console.log(error);

      toast.error((error as Error).message);
    } finally {
    }

    //   break;
    // case `Connect wallet`:
    //   connectWallet();
    //   break;
    // }
  }

  return (
    <CollectionContext.Provider
      value={{
        initializeEditor: initializeEditor,
        collection: collectionRef.current,
        getCollection: getCollection,
        setCollection: setCollection,
        reloadFunction: reloadFunction,
        showResult,
        executionButton,
        executionWorkflowButton,
        walletId,
        response,
        workflowResponse,
        setWorkflowResponse,
        emptyResponse,
        connectWallet: connectWallet,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
