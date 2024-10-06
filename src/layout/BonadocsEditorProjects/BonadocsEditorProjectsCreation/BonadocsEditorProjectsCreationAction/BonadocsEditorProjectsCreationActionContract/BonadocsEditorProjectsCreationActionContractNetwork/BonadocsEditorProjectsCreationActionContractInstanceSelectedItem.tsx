import React, { useCallback, useEffect, useRef, useState } from "react";
import { RadioInput } from "@/components/input/RadioInput";
import { TextInput } from "@/components/input/TextInput";
import { ContractInstance, Option } from "@/data/dataTypes";
import { TextareaInput } from "@/components/input/TextareaInput";
import { Button } from "@/components/button/Button";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setCurrentContract,
  updateContract,
  updateContractInstances,
} from "@/store/project/projectSlice";
import { getApi } from "@bonadocs/core";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { set } from "lodash";
import { BonadocsEditorProjectsCreationActionContractInstanceDeleteModal } from "../BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractInstanceDeleteModal";
import _ from "lodash";

interface BonadocsEditorProjectsCreationActionContractInstanceSelectedItemProps {
  instance: ContractInstance;
  instanceLength?: number;
}

export const BonadocsEditorProjectsCreationActionContractInstanceSelectedItem: React.FC<
  BonadocsEditorProjectsCreationActionContractInstanceSelectedItemProps
> = ({ instance, instanceLength }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const options: Option[] = [
    {
      value: "Verified",
      label: `verification${instance.chainId}`,
      description: "Verified contract",
      truthyValue: true,
    },
    {
      value: "Unverified",
      label: `verification${instance.chainId}`,
      description: "Unverified contract",
      truthyValue: false,
    },
  ];

  const contractAddress = useRef(instance.address);
  const [open, setOpen] = useState<boolean>(
    instanceLength === 1 ? true : false
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [localVerification, setLocalVerification] = useState<boolean>(
    instance.verification ?? true
  );
  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );

  const deleteInstance = () => {
    let instances = currentContract.contractInstances?.slice();
    instances?.splice(instances.indexOf(instance), 1);
    dispatch(
      setCurrentContract({
        ...currentContract,
        contractInstances: instances,
      })
    );

    dispatch(updateContractInstances(instances!));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "e.target.value");

    let instances = currentContract.contractInstances?.slice();
    const newInstance: ContractInstance = {
      ...instance,
      verification: e.target.value === "Verified" ? true : false,
    };

    e.target.value === "Verified"
      ? setLocalVerification(true)
      : setLocalVerification(false);
    instances?.splice(instances.indexOf(instance!), 1, newInstance);

    dispatch(
      setCurrentContract({
        ...currentContract,
        contractInstances: instances,
      })
    );
    dispatch(updateContractInstances(instances!));
    if (e.target.value === "Verified") loadABI();
  };

  const handleABIChange = (abi: string) => {
    let instances = currentContract.contractInstances?.slice();
    const newInstance: ContractInstance = {
      ...instance,
      address: contractAddress.current,
      abi: abi,
    };
    instances?.splice(instances.indexOf(instance!), 1, newInstance);

    const updatedContract = {
      ...currentContract,
      abi,
      contractInstances: instances,
    };

    dispatch(setCurrentContract(updatedContract));
    dispatch(updateContractInstances(instances!));
    dispatch(updateContract(updatedContract));
  };

  const loadABI = useCallback(
    _.debounce(async (address?: string) => {
      const EVMaddress = address ?? contractAddress.current;
      console.log(EVMaddress, "EVMaddress", localVerification);

      if (EVMaddress?.length === 42 && localVerification) {
        setLoading(true);
        getApi()
          .loadContractABI(instance.chainId!, EVMaddress)
          .then((abi) => {
            handleABIChange(abi!);
            typeof abi === "undefined"
              ? toast.error("ABI error. Input it manually.")
              : handleABIChange(abi);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, "error");
            toast.error("Error loading ABI");
          });
      }
    }, 500),
    []
  );

  useEffect(() => {
    contractAddress.current = instance.address;
  }, [instance.address]);

  useEffect(() => {
    setLocalVerification(instance.verification ?? true);
  }, [instance.verification]);

 

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
          src={instance.logo}
          alt="logo"
        />
        <h2 className="bonadocs__editor__projects__creation__selection__item__name">
          {instance.name}
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
          <RadioInput
            checked={localVerification}
            options={options}
            handleChange={handleChange}
          />
          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract address
          </h2>
          <TextInput
            placeholder="eg. 0x0123456789ABCDEF0123456789ABCDEF01234567"
            value={contractAddress.current}
            handleChange={(e) => {
              contractAddress.current = e.target.value.trim();
              let instances = currentContract.contractInstances?.slice();
              const newInstance: ContractInstance = {
                ...instance,
                address: contractAddress.current.trim(),
              };
              instances?.splice(instances.indexOf(instance!), 1, newInstance);

              dispatch(
                setCurrentContract({
                  ...currentContract,
                  contractInstances: instances,
                })
              );
              dispatch(updateContractInstances(instances!));

              loadABI(e.target.value);
            }}
          />
          {loading && (
            <Button
              className="bonadocs__editor__projects__creation__selection__item__deets__button"
              type="action"
              disabled={loading}
            >
              <h4>Loading ABI...</h4>
            </Button>
          )}
          {/* <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract ABI (read only)
          </h2>
          <TextareaInput
            value={contractABI}
            disabled
            handleChange={(e) => {
              handleABIChange(e.target.value);
            }}
          /> */}
          <h2
            className="bonadocs__editor__projects__creation__selection__item__deets__delete"
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Delete Network
          </h2>
        </div>
      )}
      <BonadocsEditorProjectsCreationActionContractInstanceDeleteModal
        handleDeleteContractInstance={deleteInstance}
        closeInstanceDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        show={openDeleteModal}
        networkName={instance.name!}
      />
    </>
  );
};
