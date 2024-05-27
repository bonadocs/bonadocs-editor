import React from "react";
import BonadocsEditorViewActionsOutputHeader from "./BonadocsEditorViewActionsOutputHeader";
import { BonadocsEditorViewActionsOutputResponse } from "./BonadocsEditorViewActionsOutputResponse";

const BonadocsEditorViewActionsOutput: React.FC = () => {
  return (
    <div className="bonadocs__editor__dashboard__playground__action__output">
      <BonadocsEditorViewActionsOutputHeader />
      <BonadocsEditorViewActionsOutputResponse />
    </div>
  );
};

export default BonadocsEditorViewActionsOutput;
