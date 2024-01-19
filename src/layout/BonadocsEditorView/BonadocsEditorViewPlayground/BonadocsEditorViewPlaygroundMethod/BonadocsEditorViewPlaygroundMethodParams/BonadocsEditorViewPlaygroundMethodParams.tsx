import React from "react";
import { Tab } from "@/components/tab/Tab";
import { BonadocsEditorViewPlaygroundMethodParamsList } from "./BonadocsEditorViewPlaygroundMethodParamsList";
export const BonadocsEditorViewPlaygroundMethodParams: React.FC = () => {
  // Component logic goes here
  return (
    <div className="bonadocs__editor__dashboard__playground__method__view">
      <div className="bonadocs__editor__dashboard__playground__method__view__params">
        <Tab>feeAmountTickSpacing</Tab>
        <BonadocsEditorViewPlaygroundMethodParamsList />
      </div>
    </div>
  );
};
