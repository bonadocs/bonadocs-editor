import React, { useEffect, useState } from "react";
import { BonadocsEditorSidebar } from "./BonadocsEditorSidebar/BonadocsEditorSidebar";
import { BonadocsEditor } from "../pages/BonadocsEditor";
import { useCollectionContext } from "@/context/CollectionContext";
import { ContractDefinition } from "@bonadocs/core";
import { useSearchParams } from "react-router-dom";

export const BonadocsEditorContainer: React.FC = () => {
  const [contracts, setContracts] = useState<ContractDefinition[]>();
  const [queryParameters] = useSearchParams();
  const uri = queryParameters.get("uri");

  const { initializeEditor, collection, logButton } = useCollectionContext();

  useEffect(() => {
    void initializeCollection();
  }, []);

  const initializeCollection = async () => {
    if (!uri) return;

    const project = await initializeEditor(uri);
    
    setContracts(project?.data.contracts);
  };
  return (
    // collection && <>

    <div className="bonadocs__editor">
      <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
      <BonadocsEditor className="bonadocs__editor__dashboard" />
    </div>

    // </>
  );
};
