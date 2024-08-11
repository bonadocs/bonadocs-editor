import React, { useState } from "react";
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
  updateContractInstances,
} from "@/store/project/projectSlice";
import { getApi } from "@bonadocs/core";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { set } from "lodash";
import { BonadocsEditorProjectsCreationActionContractInstanceDeleteModal } from "../BonadocsEditorProjectsCreationActionContractModal/BonadocsEditorProjectsCreationActionContractInstanceDeleteModal";

interface BonadocsEditorProjectsCreationActionContractInstanceSelectedItemProps {
  instance: ContractInstance;
}

export const BonadocsEditorProjectsCreationActionContractInstanceSelectedItem: React.FC<
  BonadocsEditorProjectsCreationActionContractInstanceSelectedItemProps
> = ({ instance }) => {
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

  const [contractAddress, setContractAddress] = useState<string>(
    instance.address! ?? ""
  );
  const [contractABI, setContractABI] = useState<string>(instance.abi! ?? "");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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
    let instances = currentContract.contractInstances?.slice();
    const newInstance: ContractInstance = {
      ...instance,
      verification: e.target.value === "Verified" ? true : false,
    };
    instances?.splice(instances.indexOf(instance!), 1, newInstance);

    dispatch(
      setCurrentContract({
        ...currentContract,
        contractInstances: instances,
      })
    );
    dispatch(updateContractInstances(instances!));
  };

  const handleABIChange = (abi: string) => {
    setContractABI(abi);
    let instances = currentContract.contractInstances?.slice();
    const newInstance: ContractInstance = {
      ...instance,
      abi: abi,
    };
    instances?.splice(instances.indexOf(instance!), 1, newInstance);

    dispatch(
      setCurrentContract({
        ...currentContract,
        contractInstances: instances,
      })
    );
    dispatch(updateContractInstances(instances!));
  };

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
          {/* <RadioInput
            checked={instance.verification ?? false}
            options={options}
            handleChange={handleChange}
          /> */}
          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract address
          </h2>
          <TextInput
            placeholder="eg. 0x0123456789ABCDEF0123456789ABCDEF01234567"
            value={contractAddress}
            handleChange={(e) => {
              setContractAddress(e.target.value);
              let instances = currentContract.contractInstances?.slice();
              const newInstance: ContractInstance = {
                ...instance,
                address: e.target.value,
              };
              instances?.splice(instances.indexOf(instance!), 1, newInstance);

              dispatch(
                setCurrentContract({
                  ...currentContract,
                  contractInstances: instances,
                })
              );
              dispatch(updateContractInstances(instances!));
            }}
          />
          {instance.verification && (
            <Button
              className="bonadocs__editor__projects__creation__selection__item__deets__button"
              type="action"
              // disabled={loading}
              onClick={() => {
                setLoading(true);
                getApi()
                  .loadContractABI(instance.chainId!, contractAddress)
                  .then((abi) => {
                    console.log(abi);
                    typeof abi === "undefined"
                      ? toast.error("ABI error. Input it manually.")
                      : handleABIChange(abi);
                    setLoading(false);
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log(err, "error");
                  });
              }}
            >
              {loading ? (
                <MoonLoader
                  color="#fff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Load ABI"
              )}
            </Button>
          )}
          <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
            Contract ABI (read only)
          </h2>
          <TextareaInput
            value={currentContract.abi}
            disabled
            handleChange={(e) => {
              handleABIChange(e.target.value);
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
      <BonadocsEditorProjectsCreationActionContractInstanceDeleteModal
        handleDeleteContractInstance={deleteInstance}
        closeInstanceDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        show={openDeleteModal}
        networkName={instance.name!}
      />
    </>
  );
};
