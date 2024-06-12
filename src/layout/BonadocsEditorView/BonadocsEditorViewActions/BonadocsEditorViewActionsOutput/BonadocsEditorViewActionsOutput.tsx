import React, { useRef } from "react";
import BonadocsEditorViewActionsOutputHeader from "./BonadocsEditorViewActionsOutputHeader";
import { BonadocsEditorViewActionsOutputResponse } from "./BonadocsEditorViewActionsOutputResponse";

const BonadocsEditorViewActionsOutput: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="bonadocs__editor__dashboard__playground__action__output"
    >
      <BonadocsEditorViewActionsOutputHeader />
      <BonadocsEditorViewActionsOutputResponse
        width={ref.current?.offsetWidth.toString()!}
      />
    </div>
  );
};

export default BonadocsEditorViewActionsOutput;
