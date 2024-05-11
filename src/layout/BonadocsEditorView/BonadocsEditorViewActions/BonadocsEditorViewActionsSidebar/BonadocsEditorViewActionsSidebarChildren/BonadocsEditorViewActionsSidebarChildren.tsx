import React, { useState } from "react";
import { BonadocsEditorViewActionsSidebarChildrenItem } from "./BonadocsEditorViewActionsSidebarChildrenItem";
// import { ReactComponent as ActionIcon } from "@/assets/SidebarIcons/action.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const BonadocsEditorViewActionsSidebarChildren: React.FC = () => {
  const actionItems = useSelector(
    (state: RootState) => state.action.collectionActions
  );
  
  return (
    <div className="bonadocs__editor__dashboard__playground__action__list__children">
      {actionItems.map((action) => (
        <BonadocsEditorViewActionsSidebarChildrenItem name={action.name} />
      ))}
    </div>
  );
};
