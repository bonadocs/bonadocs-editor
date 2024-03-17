import React from "react";
import { BonadocsEditorViewVariablesTableHeader } from "./BonadocsEditorViewVariablesTableHeader";
import { BonadocsEditorViewVariablesTableItems } from "./BonadocsEditorViewVariablesTableItems";

interface BonadocsEditorViewVariablesTableProps {
  className?: string;
}
export const BonadocsEditorViewVariablesTable: React.FC<
  BonadocsEditorViewVariablesTableProps
> = ({ className }) => {
  
  return (
    // Your component JSX code here
    <div className={className}>
      <BonadocsEditorViewVariablesTableHeader />
      <BonadocsEditorViewVariablesTableItems />
    </div>
  );
};
