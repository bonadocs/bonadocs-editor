import React from "react";
import { BonadocsEditorViewVariablesHeader } from "./BonadocsEditorViewVariablesHeader";
import { BonadocsEditorViewVariablesTable } from "./BonadocsEditorViewVariablesTable/BonadocsEditorViewVariablesTable";
export const BonadocsEditorViewVariables: React.FC = () => {
  // Component logic goes here

  return (
    // Component JSX goes here
    <div className="bonadocs__editor__variables">
      <BonadocsEditorViewVariablesHeader className="bonadocs__editor__variables__header" />
      <BonadocsEditorViewVariablesTable className="bonadocs__editor__variables__table" />
    </div>
  );
};
