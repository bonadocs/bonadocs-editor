import React, { useState, useEffect } from "react";
import { TextareaInput } from "@/components/input/TextareaInput";
import { TextInput } from "@/components/input/TextInput";

import { BonadocsEditorProjectsCreationActionContractSelect } from "./BonadocsEditorProjectsCreationActionContractSelect";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setCurrentContract, updateContract } from "@/store/project/projectSlice";

interface BonadocsEditorProjectsCreationActionContractItemProps {
  // Add your component props here
}

export const BonadocsEditorProjectsCreationActionContractItem: React.FC<
  BonadocsEditorProjectsCreationActionContractItemProps
> = (props) => {
  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );
  const [contractName, setContractName] = useState<string>(
    currentContract.name
  );
  const [contractDescription, setContractDescription] = useState<string>(currentContract.description!);
  const dispatch = useDispatch();
  


  useEffect(() => {
    if (currentContract) {
      setContractName(currentContract.name);
      setContractDescription(currentContract.description!);
    }
  },[currentContract]);

  return (
    <div className="bonadocs__editor__projects__action__contract__form">
      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Contract name
        </h4>
        <TextInput
          className="bonadocs__editor__projects__action__contract__form__item__input"
          handleChange={(e) => {
            setContractName(e.target.value);
            const updatedContract = {
              ...currentContract,
              name: e.target.value,
            };
            dispatch(setCurrentContract(updatedContract));
            dispatch(updateContract(updatedContract));
          }}
          placeholder="Contract name"
          value={contractName}
        />
      </div>
      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Contract description
        </h4>
        <TextareaInput
          className="bonadocs__editor__projects__action__contract__form__item__input"
          handleChange={(e) => {
            setContractDescription(e.target.value);
            const updatedContract = {
              ...currentContract,
              description: e.target.value,
            };
            dispatch(setCurrentContract(updatedContract));
            dispatch(updateContract(updatedContract));
          }}
          value={contractDescription}
          placeholder="Contract description"
        />
      </div>
      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Add contract instances
        </h4>
        <BonadocsEditorProjectsCreationActionContractSelect />
      </div>
    </div>
  );
};
