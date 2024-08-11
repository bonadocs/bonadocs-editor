import React, { useState, useEffect } from "react";
import { ContractsState, Instance } from "@/data/dataTypes";
import clsx from "clsx";
import { TextInput } from "@/components/input/TextInput";
import { supportedChains } from "@bonadocs/core";
import {
  setCurrentContract,
  updateContractInstances,
} from "@/store/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { BonadocsEditorProjectsCreationActionContractInstanceDeleteModal } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsCreation/BonadocsEditorProjectsCreationAction/BonadocsEditorProjectsCreationActionContract/BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractInstanceDeleteModal";
interface BonadocsEditorViewPlaygroundContractModalContractItemInstancesItemProps {
  instance: Instance;
  instanceList: Instance[];
  contractItem: ContractsState;
  handleUpdate: React.Dispatch<React.SetStateAction<Instance[]>>;
}

export const BonadocsEditorViewPlaygroundContractModalContractItemInstancesItem: React.FC<
  BonadocsEditorViewPlaygroundContractModalContractItemInstancesItemProps
> = ({ instance, contractItem, handleUpdate, instanceList }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [contractAddress, setContractAddress] = useState<string>(
    instance.address! ?? ""
  );
  const contracts = useSelector((state: RootState) => state.project.contracts);
  const dispatch = useDispatch<AppDispatch>();
  const network = Array.from(supportedChains).find(
    (chain) => chain[1].chainId === instance.chainId
  );

  const deleteInstance = () => {
    let instances = instanceList.slice();
    instances?.splice(instances.indexOf(instance), 1);

    dispatch(
      setCurrentContract({
        ...contractItem,
        contractInstances: instances,
      })
    );

    dispatch(updateContractInstances(instances!));

    handleUpdate(instances);
  };

  useEffect(() => {
    setContractAddress(instance.address! ?? "");
  }, [instance.chainId, instance.address]);

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
        <img
          className="bonadocs__editor__projects__creation__selection__item__image"
          src={network?.[1].imageUrl}
          alt="logo"
        />
        <h2 className="bonadocs__editor__projects__creation__selection__item__name">
          {network?.[1].name}
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
      </div>
      <>
        {open && (
          <div className="bonadocs__editor__projects__creation__selection__item__deets">
            <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
              Contract address
            </h2>
            <TextInput
              placeholder="eg. 0x0123456789ABCDEF0123456789ABCDEF01234567"
              value={contractAddress}
              handleChange={(e) => {
                setContractAddress(e.target.value);

                let instances = instanceList.slice();

                const newInstance: Instance = {
                  ...instance,
                  address: e.target.value,
                };
                instances?.splice(instances.indexOf(instance), 1, newInstance);
                handleUpdate(instances);
                dispatch(
                  setCurrentContract({
                    ...contractItem,
                    contractInstances: instances,
                  })
                );
                dispatch(updateContractInstances(instances!));
              }}
            />

            <h2
              className="bonadocs__editor__projects__creation__selection__item__deets__delete"
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            >
              Delete Instance
            </h2>
          </div>
        )}
      </>
      <BonadocsEditorProjectsCreationActionContractInstanceDeleteModal
        handleDeleteContractInstance={deleteInstance}
        closeInstanceDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        show={openDeleteModal}
        networkName={network?.[1].name}
      />
    </>
  );
};
