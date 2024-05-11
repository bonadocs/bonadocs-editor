import React from "react";
import { BonadocsEditorViewActionsSidebarHeader } from "./BonadocsEditorViewActionsSidebarHeader";
import { BonadocsEditorViewActionsSidebarChildren } from "./BonadocsEditorViewActionsSidebarChildren/BonadocsEditorViewActionsSidebarChildren";
export const BonadocsEditorViewActionsSidebar: React.FC = () => {
  return (
    <div className="bonadocs__editor__dashboard__playground__action__list">
      <BonadocsEditorViewActionsSidebarHeader />
      <BonadocsEditorViewActionsSidebarChildren/>
    </div>
  );
};
