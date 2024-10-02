import React, { useEffect, useState } from "react";

import { BonadocsEditorProjectsCreationActionContractItem } from "./BonadocsEditorProjectsCreationActionContractItem";
import { BonadocsEditorProjectsCreationActionContractPagination } from "./BonadocsEditorProjectsCreationActionContractPagination";
import { BonadocsEditorProjectsCreationActionContractDeleteModal } from "./BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractDeleteModal";
import {
  addEmptyContract,
  deleteContract,
  setContracts,
  setCurrentContract,
} from "@/store/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

export const BonadocsEditorProjectsCreationActionContract: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [scrollToLatest, setScrollToLatest] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );

  const contracts = useSelector((state: RootState) => state.project.contracts);
  const deleteCurrentContract = () => {
    const currentContractId = contracts.indexOf(currentContract);
    dispatch(deleteContract(currentContractId));
    dispatch(setCurrentContract(contracts[currentContractId - 1]));
  };

  // useEffect(() => {
  //    console.log('clear');
     
  //    dispatch(setContracts([]));
  //  }, []);

  return (
    <div className="bonadocs__editor__projects__action__contract">
      <h2 className="bonadocs__editor__projects__action__contract__title">
        Contract details
      </h2>

      <BonadocsEditorProjectsCreationActionContractItem />
      <div className="bonadocs__editor__projects__action__contract__options">
        <h3
          onClick={() => {
            dispatch(addEmptyContract());
            setScrollToLatest(!scrollToLatest);
          }}
          className="bonadocs__editor__projects__action__contract__options__add"
        >
          Add more contracts +
        </h3>
        {Number(currentContract.id) !== 0 && (
          <h3
            className="bonadocs__editor__projects__action__contract__options__delete"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete contract
          </h3>
        )}
      </div>
      <BonadocsEditorProjectsCreationActionContractPagination
        scrollToLatest={scrollToLatest}
      />
      <BonadocsEditorProjectsCreationActionContractDeleteModal
        show={openDeleteModal}
        handleDeleteContract={deleteCurrentContract}
        closeDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        contractName={currentContract.name ?? ""}
      />
    </div>
  );
};
