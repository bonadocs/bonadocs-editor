import React, { useEffect, useState } from "react";
import { BonadocsEditorSidebar } from "./BonadocsEditorSidebar/BonadocsEditorSidebar";
import { BonadocsEditor } from "../pages/BonadocsEditor";
import { useCollectionContext } from "@/context/CollectionContext";
import { useSearchParams } from "react-router-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  setMethodItem,
  setMethodDisplayData,
  setTransactionOverrides,
} from "@/store/method/methodSlice";
import { MethodItem, ContractItem } from "@/data/dataTypes";
import { setActiveContract } from "@/store/contract/contractSlice";

export const BonadocsEditorContainer: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const uri = queryParameters.get("uri");
  const { initializeEditor } = useCollectionContext();
  const contract = useSelector(
    (state: RootState) => state.contract.currentContract
  );
  const method = useSelector(
    (state: RootState) => state.method.methodDisplayData
  );
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    void initializeCollection();
  }, []);

  const initializeCollection = async () => {
    if (!uri) return;

    await initializeEditor(uri);
    if (queryParams.get("uri") !== contract.uri) {
      dispatch(setMethodItem({} as MethodItem));
      dispatch(setMethodDisplayData([]));
      dispatch(setActiveContract({} as ContractItem));
      dispatch(setTransactionOverrides([]));
    }
    setDisplay(true);
  };
  return (
    <>
      {display && (
        <>
          <div className="bonadocs__editor">
            {/* <BonadocsEditorSidebar className="bonadocs__editor__sidebar" /> */}
            <BonadocsEditor className="bonadocs__editor__dashboard" />
          </div>
          <div className="bonadocs__editor__mobile">
            <h3>Kindly view on desktop</h3>
          </div>
        </>
      )}{" "}
    </>
  );
};
