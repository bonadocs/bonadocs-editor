import React from "react";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { BonadocsEditorViewsActionsPackagesSidebarChildrenItem } from "./BonadocsEditorViewsActionsPackagesSidebarChildrenItem";
interface BonadocsEditorViewsActionsPackagesSidebarChildrenProps {
  // Add your component props here
}

export const BonadocsEditorViewsActionsPackagesSidebarChildren: React.FC<
  BonadocsEditorViewsActionsPackagesSidebarChildrenProps
  > = (props) => {
  
  const packageList = useSelector(
    (state: RootState) => state.package.collectionPackages
  );
 

  

  return (
    <div className="bonadocs__editor__dashboard__playground__action__list__children">
      {packageList.map(
        (collectionPackage: { name: string; version: string }, i) => (
          <BonadocsEditorViewsActionsPackagesSidebarChildrenItem
            name={collectionPackage.name}
            version={collectionPackage.version}
            key={i}
          />
        )
      )}
    </div>
  );
};
