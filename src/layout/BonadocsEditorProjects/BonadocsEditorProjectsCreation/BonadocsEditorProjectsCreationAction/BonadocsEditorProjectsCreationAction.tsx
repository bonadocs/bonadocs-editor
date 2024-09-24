import React from "react";

import { BonadocsEditorProjectsCreationActionSteps } from "../BonadocsEditorProjectsCreationActionSteps/BonadocsEditorProjectsCreationActionSteps";
import { BonadocsEditorProjectsCreationActionWrapper } from "./BonadocsEditorProjectsCreationActionWrapper";

export const BonadocsEditorProjectsCreationAction: React.FC = () => {
  return (
    <div className="bonadocs__editor__projects__action">
      <BonadocsEditorProjectsCreationActionSteps />
      <BonadocsEditorProjectsCreationActionWrapper />
    </div>
  );
};
