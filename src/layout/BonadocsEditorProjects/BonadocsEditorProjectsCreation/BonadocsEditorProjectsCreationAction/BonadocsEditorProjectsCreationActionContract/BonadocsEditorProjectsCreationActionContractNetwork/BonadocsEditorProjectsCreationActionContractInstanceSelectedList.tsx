import { RootState } from "@/store";
import React, { useEffect } from "react";
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

  // const contracts = useSelector((state: RootState) => state.project.contracts);

  // useEffect(() => {console.log("currentContract", currentContract, contracts);
  // }, [currentContract]);


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
