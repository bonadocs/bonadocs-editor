import React from "react";
import { BonadocsEditorViewActionsCode } from "./BonadocsEditorViewActionsCode/BonadocsEditorViewActionsCode";
import { BonadocsEditorViewActionsSidebar } from "./BonadocsEditorViewActionsSidebar/BonadocsEditorViewActionsSidebar";
import BonadocsEditorViewActionsOutput from "./BonadocsEditorViewActionsOutput/BonadocsEditorViewActionsOutput";

export const BonadocsEditorViewActionsWrapper: React.FC = () => {
  return (
    <>
      <BonadocsEditorViewActionsSidebar />
      <BonadocsEditorViewActionsCode />
      <BonadocsEditorViewActionsOutput />
    </>
  );
};
