import React, { useState, useEffect } from "react";
import { BonadocsEditorProjectsCreationActionContractInstanceModal } from "./BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractInstanceModal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  updateContractInstances,
  setCurrentContract,
} from "@/store/project/projectSlice";
import { ContractInstance } from "@/data/dataTypes";
import { BonadocsEditorProjectsCreationActionContractInstanceDeleteModal } from "./BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractInstanceDeleteModal";

export const BonadocsEditorProjectsCreationActionContractSelect: React.FC =
  () => {
    const [openInstanceModal, setOpenInstanceModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedInstance, setSelectedInstance] =
      useState<ContractInstance | null>(null);
    const currentContract = useSelector(
      (state: RootState) => state.project.currentContract
    );

    const contracts = useSelector(
      (state: RootState) => state.project.contracts
    );

    const dispatch = useDispatch<AppDispatch>();
    const [contractInstances, setContractInstances] = useState<
      ContractInstance[]
    >(currentContract.contractInstances!);

    const deleteInstance = () => {
      let instances = contractInstances.slice();
      instances?.splice(instances.indexOf(selectedInstance!), 1);
      dispatch(
        setCurrentContract({
          ...currentContract,
          contractInstances: instances,
        })
      );

      dispatch(updateContractInstances(instances!));
    };

    useEffect(() => {
      if (currentContract) {
        setContractInstances(currentContract.contractInstances!);
      }
    }, [currentContract]);
    return (
      <div className="bonadocs__editor__projects__action__select">
        <div className="bonadocs__editor__projects__action__select__inner">
          <div className="bonadocs__editor__projects__action__select__inner__network">
            {contracts[Number(currentContract.id)].contractInstances?.length ===
              0 && (
              <h4 className="bonadocs__editor__projects__action__select__inner__network__placeholder">
                Click "+" icon to add instance
              </h4>
            )}
            {contractInstances?.map((instance, index) => (
              <div key={index} className="bonadocs__editor__projects__action__select__inner__network__item">
                <img src={instance.logo} />
                <div className="bonadocs__editor__projects__action__select__inner__network__item__name">
                  {instance.name}
                </div>
                <img
                  onClick={() => {
                    let instances = contractInstances.slice();
                    setSelectedInstance(instances[index]);
                    setOpenDeleteModal(true);
                  }}
                  alt="delete instance"
                  src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1701455363/close_isqdse.svg"
                />
              </div>
            ))}
          </div>
          {currentContract.contractInstances?.length ?? 0 > 0 ? (
            <img
              onClick={() => setOpenInstanceModal(!openInstanceModal)}
              src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720750528/Icon_Edit_kvkncx.svg"
            />
          ) : (
            <svg
              onClick={() => setOpenInstanceModal(!openInstanceModal)}
              className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8L12 8"
                stroke="#95A8C0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12L8 4"
                stroke="#95A8C0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <BonadocsEditorProjectsCreationActionContractInstanceModal
          show={openInstanceModal}
          closeInstanceModal={() => setOpenInstanceModal(!openInstanceModal)}
        />
        <BonadocsEditorProjectsCreationActionContractInstanceDeleteModal
          handleDeleteContractInstance={deleteInstance}
          networkName={selectedInstance?.name!}
          show={openDeleteModal}
          closeInstanceDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        />
      </div>
    );
  };
