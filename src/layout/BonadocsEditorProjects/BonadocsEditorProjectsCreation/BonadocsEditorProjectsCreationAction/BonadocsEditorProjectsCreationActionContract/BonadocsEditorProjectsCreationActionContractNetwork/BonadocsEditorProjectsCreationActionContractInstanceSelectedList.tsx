import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { BonadocsEditorProjectsCreationActionContractInstanceSelectedItem } from "./BonadocsEditorProjectsCreationActionContractInstanceSelectedItem";

interface BonadocsEditorProjectsCreationActionContractInstanceSelectedListProps {
  searchValue: string;
}
export const BonadocsEditorProjectsCreationActionContractInstanceSelectedList: React.FC<
  BonadocsEditorProjectsCreationActionContractInstanceSelectedListProps
> = ({ searchValue }) => {
  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );

  return (
    <div className="bonadocs__editor__projects__creation__selection__list">
      {currentContract.contractInstances
        ?.filter(
          (network) =>
            network.name?.toLowerCase().includes(searchValue) ||
            searchValue.toLowerCase() === ""
        )
        .map((instance, index) => (
          <BonadocsEditorProjectsCreationActionContractInstanceSelectedItem
            instance={instance}
            key={index}
            instanceLength={currentContract.contractInstances?.length}
          />
        ))}
    </div>
  );
};
