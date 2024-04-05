import React, { useEffect, useState } from "react";
import { BonadocsEditorSidebar } from "./BonadocsEditorSidebar/BonadocsEditorSidebar";
import { BonadocsEditor } from "../pages/BonadocsEditor";
import { useCollectionContext } from "@/context/CollectionContext";
import { useSearchParams } from "react-router-dom";

export const BonadocsEditorContainer: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const [display, setDisplay] = useState<boolean>(false);
  const uri = queryParameters.get("uri");
  const { initializeEditor } = useCollectionContext();

  useEffect(() => {
    void initializeCollection();
  }, []);

  const initializeCollection = async () => {
    if (!uri) return;

    await initializeEditor(uri);
    setDisplay(true);
  };
  return (
    <>
      {display && (
        <div className="bonadocs__editor">
          <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
          <BonadocsEditor className="bonadocs__editor__dashboard" />
        </div>
      )}{" "}
    </>
  );
};
