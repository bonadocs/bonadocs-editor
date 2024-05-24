import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

import { BonadocsEditorActionsModalPackageAddListItem } from "./BonadocsEditorActionsModalPackageAddListItem";
export const BonadocsEditorActionsModalPackageAddList: React.FC = () => {
  const packageList = useSelector(
    (state: RootState) => state.package.collectionPackages
  );
  return (
    <>
      {packageList.map((collectionPackage: { name: any },i) => (
        <BonadocsEditorActionsModalPackageAddListItem
          name={collectionPackage.name}
          key={i}
        />
      ))}
    </>
  );
};
