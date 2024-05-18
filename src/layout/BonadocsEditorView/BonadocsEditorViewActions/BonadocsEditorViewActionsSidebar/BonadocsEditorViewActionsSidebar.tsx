import React from "react";
import { BonadocsEditorViewActionsSidebarHeader } from "./BonadocsEditorViewActionsSidebarHeader";
import { BonadocsEditorViewActionsSidebarChildren } from "./BonadocsEditorViewActionsSidebarChildren/BonadocsEditorViewActionsSidebarChildren";
import { BonadocsEditorViewsActionsPackagesSidebarChildren } from "../BonadocsEditorViewActionsPackagesSidebar/BonadocsEditorViewsActionsPackagesSidebarChildren/BonadocsEditorViewsActionsPackagesSidebarChildren";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { BonadocsEditorViewActionsPackagesSidebarHeader } from "../BonadocsEditorViewActionsPackagesSidebar/BonadocsEditorViewActionsPackagesSidebarHeader";

export const BonadocsEditorViewActionsSidebar: React.FC = () => {
  const packagesView = useSelector(
    (state: RootState) => state.controlBoard.packagesView
  );
  return (
    <div className="bonadocs__editor__dashboard__playground__action__list">
      {!packagesView ? (
        <>
          <BonadocsEditorViewActionsSidebarHeader />
          <BonadocsEditorViewActionsSidebarChildren />
        </>
      ) : (
        <>
            <BonadocsEditorViewActionsPackagesSidebarHeader />
            <BonadocsEditorViewsActionsPackagesSidebarChildren />
        </>
      )}
    </div>
  );
};
