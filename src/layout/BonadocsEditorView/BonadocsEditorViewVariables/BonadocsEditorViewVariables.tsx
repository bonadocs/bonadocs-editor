import React, { useEffect } from "react";
import { BonadocsEditorViewVariablesHeader } from "./BonadocsEditorViewVariablesHeader";
import { BonadocsEditorViewVariablesTable } from "./BonadocsEditorViewVariablesTable/BonadocsEditorViewVariablesTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/index";
import { fetchCollectionVariables } from "@/store/variable/variableSlice";

export const BonadocsEditorViewVariables: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    // Component JSX goes here
    <div className="bonadocs__editor__variables">
      <BonadocsEditorViewVariablesHeader className="bonadocs__editor__variables__header" />
      <BonadocsEditorViewVariablesTable className="bonadocs__editor__variables__table" />
    </div>
  );
};
