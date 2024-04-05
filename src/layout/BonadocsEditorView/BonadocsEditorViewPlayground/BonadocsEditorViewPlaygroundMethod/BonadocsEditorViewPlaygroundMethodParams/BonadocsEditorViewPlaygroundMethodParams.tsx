import React from "react";
import { Tab } from "@/components/tab/Tab";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewPlaygroundMethodParamsNetworks } from "./BonadocsEditorViewPlaygroundMethodParamsNetworks";

import { BonadocsEditorViewPlaygroundMethodParamsList } from "./BonadocsEditorViewPlaygroundMethodParamsList";
export const BonadocsEditorViewPlaygroundMethodParams: React.FC = () => {
  const methodItem = useSelector((state: RootState) => state.method.methodItem);
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );

  return (
    <div
      className={`bonadocs__editor__dashboard__playground__method__view ${
        displayDoc !== "interaction" &&
        "bonadocs__editor__dashboard__playground__method__view__doc"
      }`}
    >
      <div className="bonadocs__editor__dashboard__playground__method__view__params">
        <Tab>{methodItem.name}</Tab>
        <BonadocsEditorViewPlaygroundMethodParamsNetworks />
        <BonadocsEditorViewPlaygroundMethodParamsList />
      </div>
    </div>
  );
};
