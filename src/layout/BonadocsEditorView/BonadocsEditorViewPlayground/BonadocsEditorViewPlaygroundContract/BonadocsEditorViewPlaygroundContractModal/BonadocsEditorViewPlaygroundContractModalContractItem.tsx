import React, { useState, useEffect } from "react";
import { ContractsState } from "@/data/dataTypes";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "@/components/input/TextInput";
import { TextareaInput } from "@/components/input/TextareaInput";
import { BonadocsEditorViewPlaygroundContractModalContractItemInstances } from "./BonadocsEditorViewPlaygroundContractModalContractItemInstances";
import {
  deleteContract,
  deletePlaygroundContract,
  setCurrentContract,
  updateContract,
} from "@/store/project/projectSlice";
import { AppDispatch, RootState } from "@/store";
import { set } from "lodash";
import { BonadocsEditorProjectsCreationActionContractDeleteModal } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsCreation/BonadocsEditorProjectsCreationAction/BonadocsEditorProjectsCreationActionContract/BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractDeleteModal";
import { toast } from "react-toastify";

interface BonadocsEditorViewPlaygroundContractModalContractItemProps {
  contractItem: ContractsState;
  handleUpdate: React.Dispatch<React.SetStateAction<ContractsState[]>>;
}

export const BonadocsEditorViewPlaygroundContractModalContractItem: React.FC<
  BonadocsEditorViewPlaygroundContractModalContractItemProps
> = ({ contractItem, handleUpdate }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [contractName, setContractName] = useState<string>(contractItem.name);
  const [contractDescription, setContractDescription] = useState<string>(
    contractItem.description!
  );
  const [contractABI, setContractABI] = useState<string>(contractItem.abi!);
  const contracts = useSelector((state: RootState) => state.project.contracts);
  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteContract = async () => {
    const currentContractId = contracts.indexOf(contractItem);
    console.log("currentContractId", currentContractId);
    if (currentContractId === 0) {
      toast.error("You require at least one contract in the playground");
      return;
    }
    
    let list = await dispatch(deletePlaygroundContract(currentContractId));
    handleUpdate(list.payload as ContractsState[]);
  };

  useEffect(() => {
    setContractName(contractItem.name);
    setContractDescription(contractItem.description!);
  }, [contractItem.name, contractItem.description, contractItem.abi]);

  useEffect(() => {
    if (currentContract) {
      
      setContractABI(currentContract.abi!);
    }
  }, [currentContract]);

  useEffect(() => {
    setContractABI(contractItem.abi!);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={clsx(
          "bonadocs__editor__projects__creation__selection__item",
          open &&
            "bonadocs__editor__projects__creation__selection__item__active"
        )}
      >
        <h2 className="bonadocs__editor__projects__creation__selection__item__name">
          {contractItem.name}
        </h2>
        <img
          alt="arrow down"
          className={clsx(
            "bonadocs__editor__projects__creation__selection__item__icon",
            open &&
              "bonadocs__editor__projects__creation__selection__item__icon__active"
          )}
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1721372197/Arrow_Down_vml65f.svg"
        />
      </div>{" "}
      {open && (
        <div className="bonadocs__editor__projects__creation__selection__item__deets">
          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract name
          </h2>
          <TextInput
            placeholder="eg. 0x0123456789ABCDEF0123456789ABCDEF01234567"
            value={contractName}
            handleChange={(e) => {
              setContractName(e.target.value);
              const updatedContract = {
                ...contractItem,
                name: e.target.value,
              };

              dispatch(updateContract(updatedContract));
            }}
          />

          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract description
          </h2>
          <TextareaInput
            placeholder=""
            value={contractDescription}
            handleChange={(e) => {
              setContractDescription(e.target.value);
              const updatedContract = {
                ...contractItem,
                description: e.target.value,
              };
              dispatch(updateContract(updatedContract));
            }}
          />

          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract ABI
          </h2>
          <TextareaInput
            placeholder=""
            value={contractABI}
            handleChange={(e) => {
              setContractABI(e.target.value);
              const updatedContract = {
                ...contractItem,
                abi: e.target.value,
              };
              dispatch(setCurrentContract(updatedContract));
              dispatch(updateContract(updatedContract));
            }}
          />
          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Networks
          </h2>

          <BonadocsEditorViewPlaygroundContractModalContractItemInstances
            contractItem={contractItem}
          />
          <h2
            className="bonadocs__editor__projects__creation__selection__item__deets__delete"
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Delete Contract
          </h2>
        </div>
      )}
      <BonadocsEditorProjectsCreationActionContractDeleteModal
        handleDeleteContract={handleDeleteContract}
        contractName={contractName}
        show={openDeleteModal}
        closeDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
      />
    </>
  );
};
