import { BonadocsEditorSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebar";
import React, { useEffect, useState } from "react";
import { MetaTags } from "@/components/metatags/Metatags";
import { useCollectionContext } from "@/context/CollectionContext";
import { useSearchParams } from "react-router-dom";
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
interface BonadocsEditorLayoutProps {
  children?: React.ReactNode;
  projectId?: string | undefined;
  teamId?: string | undefined;
}

export const BonadocsEditorLayout: React.FC<BonadocsEditorLayoutProps> = ({
  children,
  projectId,
  teamId,
}) => {
  const { initializeEditor, getCollection } = useCollectionContext();
  const collectionName = getCollection()?.data.name ?? "";
  const [queryParameters] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const uri = queryParameters.get("uri");

  const contract = useSelector(
    (state: RootState) => state.contract.currentContract
  );

  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    void initializeCollection();
  }, []);

  const initializeCollection = async () => {
    if (projectId && teamId) {
      console.log(projectId, teamId);
      const uriId = await initializeEditor({ projectId, teamId });
      
      if (uriId !== contract.uri) {
        dispatch(setMethodItem({} as MethodItem));
        dispatch(setMethodDisplayData([]));
        dispatch(setActiveContract({} as ContractItem));
        dispatch(setTransactionOverrides([]));
      }
    } else if (uri) {
      await initializeEditor({ uri: uri! });
      if (queryParams.get("uri") !== contract.uri) {
        dispatch(setMethodItem({} as MethodItem));
        dispatch(setMethodDisplayData([]));
        dispatch(setActiveContract({} as ContractItem));
        dispatch(setTransactionOverrides([]));
      }
    }

    setDisplay(true);
  };

  return (
    <>
      {true && (
        <>
          {" "}
          <MetaTags
            title={`${collectionName} Playground`}
            description={`The playground provides a simple and practical way to enable devs to integrate ${collectionName} in their production apps and protocols.`}
          />
          <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
          {children}
        </>
      )}
    </>
  );
};
