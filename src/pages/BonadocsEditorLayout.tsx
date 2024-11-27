import { BonadocsEditorSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebar";
import React, { useEffect, useState } from "react";
import { MetaTags } from "@/components/metatags/Metatags";
import { useCollectionContext } from "@/context/CollectionContext";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  setMethodItem,
  setMethodDisplayData,
  setTransactionOverrides,
} from "@/store/method/methodSlice";
import { MethodItem, ContractItem } from "@/data/dataTypes";
import { setActiveContract } from "@/store/contract/contractSlice";
import { LoadingModal } from "@/layout/Modal/LoadingModal";
import { setLoadingScreen, setWarningBar } from "@/store/controlBoard/controlBoardSlice";
import { getAllPackages } from "@/store/package/packageSlice";

interface BonadocsEditorLayoutProps {}

export const BonadocsEditorLayout: React.FC<
  BonadocsEditorLayoutProps
> = ({}) => {
  const { initializeEditor, getCollection, emptyResponse } = useCollectionContext();
  let collectionName;
  if (getCollection()) {
    collectionName = getCollection()?.data.name;
  }
  const [queryParameters] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const uri = queryParameters.get("uri");
  const { projectId, id } = useParams();
  const teamId = id;

  const contract = useSelector(
    (state: RootState) => state.contract.currentContract
  );

  const queryParams = new URLSearchParams(window.location.search);
  const loadingScreen = useSelector(
    (state: RootState) => state.controlBoard.loadingScreen
  );

  useEffect(() => {
    void initializeCollection();
  }, []);

  const initializeCollection = async () => {
    dispatch(setLoadingScreen(true));
    emptyResponse();
    if (projectId && teamId) {
      await initializeEditor({ projectId, teamId });
      const uriId = `/projects/${teamId}/collections/${projectId}`;
      if (uriId !== contract.uri) {
        dispatch(setMethodItem({} as MethodItem));
        dispatch(setMethodDisplayData([]));
        dispatch(setActiveContract({} as ContractItem));
        dispatch(setTransactionOverrides([]));
        await dispatch(getAllPackages(getCollection()!));
      }
    } else if (uri) {
      await initializeEditor({ uri: uri! });
      if (queryParams.get("uri") !== contract.uri) {
        dispatch(setMethodItem({} as MethodItem));
        dispatch(setMethodDisplayData([]));
        dispatch(setActiveContract({} as ContractItem));
        dispatch(setTransactionOverrides([]));
        await dispatch(getAllPackages(getCollection()!));
      }
    }

    setDisplay(true);
    dispatch(setLoadingScreen(false));
    dispatch(setWarningBar(false));
  };

  return (
    <>
      {display && (
        <>
          {" "}
          <MetaTags
            title={`${collectionName} Playground`}
            description={`The playground provides a simple and practical way to enable devs to integrate ${collectionName} in their production apps and protocols.`}
          />
          <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
          <Outlet />
        </>
      )}
      <LoadingModal show={loadingScreen} />
    </>
  );
};
