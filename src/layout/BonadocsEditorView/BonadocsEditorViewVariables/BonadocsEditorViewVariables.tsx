import React, { useEffect } from "react";
import { BonadocsEditorViewVariablesHeader } from "./BonadocsEditorViewVariablesHeader";
import { BonadocsEditorViewVariablesTable } from "./BonadocsEditorViewVariablesTable/BonadocsEditorViewVariablesTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/index";
import { BonadocsEditorViewPlaygroundPlaceholder } from "../BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundPlaceholder";

export const BonadocsEditorViewVariables: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const variables = useSelector(
    (state: RootState) => state.variable.collectionVariables
  );
  return (
    // Component JSX goes here
    <div className="bonadocs__editor__variables">
      <BonadocsEditorViewVariablesHeader className="bonadocs__editor__variables__header" />
      {variables.length !== 0 ? (
        <BonadocsEditorViewVariablesTable className="bonadocs__editor__variables__table" />
      ) : (
        <BonadocsEditorViewPlaygroundPlaceholder
          title="There are no variables yet."
          description="The variables created in your project are shown here."
          className="bonadocs__editor__variables__table__placeholder"
        />
      )}
    </div>
  );
};
