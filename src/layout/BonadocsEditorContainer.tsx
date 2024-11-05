import React, { useEffect, useState } from "react";

import { BonadocsEditor } from "../pages/BonadocsEditor";
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
import { getApi } from "@bonadocs/core";

export const BonadocsEditorContainer: React.FC = () => {
   getApi(process.env.REACT_APP_BONADOCS_ENDPOINT);
  const [queryParameters] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const uri = queryParameters.get("uri");
  const { initializeEditor } = useCollectionContext();
  const contract = useSelector(
    (state: RootState) => state.contract.currentContract
  );

  const queryParams = new URLSearchParams(window.location.search);

  // useEffect(() => {
  //   void initializeCollection();
  // }, []);

  // const initializeCollection = async () => {

  //    if (!uri) return;

  //   await initializeEditor(uri!);
  //   if (queryParams.get("uri") !== contract.uri) {
  //     dispatch(setMethodItem({} as MethodItem));
  //     dispatch(setMethodDisplayData([]));
  //     dispatch(setActiveContract({} as ContractItem));
  //     dispatch(setTransactionOverrides([]));
  //   }
  //    setDisplay(true);
  // };
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  useEffect(() => {
     authToken &&
       getApi().authenticate(authToken);
  }, []);

  return (
    <>
      <>
        <div className="bonadocs__editor">
          {/* <BonadocsEditorSidebar className="bonadocs__editor__sidebar" /> */}
          <BonadocsEditor className="bonadocs__editor__dashboard" />
        </div>
        <div className="bonadocs__editor__mobile">
          <h3>Kindly view on desktop</h3>
        </div>
      </>
    </>
  );
};
