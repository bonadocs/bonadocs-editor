import React, { useEffect, useState } from "react";

import { BonadocsEditorProjectsCreationActionSteps } from "../BonadocsEditorProjectsCreationActionSteps/BonadocsEditorProjectsCreationActionSteps";
import { BonadocsEditorProjectsCreationActionWrapper } from "./BonadocsEditorProjectsCreationActionWrapper";

interface BonadocsEditorProjectsCreationActionProps {
  className?: string;
}
export const BonadocsEditorProjectsCreationAction: React.FC<
  BonadocsEditorProjectsCreationActionProps
> = ({ className }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

  useEffect(() => {
    // Function to show the warning dialog
    const handleBeforeUnload = (event: any) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
    <div className={`bonadocs__editor__projects__action  ${className}`}>
      <BonadocsEditorProjectsCreationActionSteps />
      <BonadocsEditorProjectsCreationActionWrapper />
    </div>
  );
};
