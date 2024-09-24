import { TextInput } from "@/components/input/TextInput";
import { ContractInstance, ContractsState } from "@/data/dataTypes";
import { supportedChains } from "@bonadocs/core";

import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundContractModalAddContractInstancesItem } from "./BonadocsEditorViewPlaygroundContractModalAddContractInstancesItem";

interface BonadocsEditorViewPlaygroundContractModalAddContractInstancesProps {
  instances: ContractInstance[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  updateInstance: React.Dispatch<React.SetStateAction<ContractsState>>;
}

export const BonadocsEditorViewPlaygroundContractModalAddContractInstances: React.FC<
  BonadocsEditorViewPlaygroundContractModalAddContractInstancesProps
> = ({ instances, setOpen, open, updateInstance }) => {
  const [searchNetwork, setSearchNetwork] = useState<string>("");

  const network = (chainId: number) =>
    Array.from(supportedChains).find((chain) => chain[1].chainId === chainId);

  const update = (
    version: string,
    instance: ContractInstance,
    address?: string
  ) => {
    switch (version) {
      case "edit":
        updateInstance((prev) => {
          const newInstance = {
            ...instance,
            address: address!,
          };
          const tempInstances = instances.slice();

          tempInstances.splice(instances.indexOf(instance), 1, newInstance);

          return {
            ...prev,
            contractInstances: tempInstances,
          };
        });
        break;
      case "delete":
        updateInstance((prev) => {
          const networks = instances.slice();
          networks.splice(instances.indexOf(instance!), 1);

          return {
            ...prev,
            contractInstances: networks,
          };
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="bonadocs__editor__projects__creation__selection__instances">
      <div className="modal__side__container__search__bar">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
            fill="#95A8C0"
          />
          <path
            d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z"
            fill="#95A8C0"
          />
        </svg>
        <TextInput
          className="modal__side__container__input"
          handleChange={(e) => {
            setSearchNetwork(e.target.value);
          }}
          value={searchNetwork}
          placeholder="Search contract instances"
        />
      </div>
      <div className="bonadocs__editor__projects__creation__selection__instances__list">
        {instances
          ?.filter(
            (instance) =>
              network(instance.chainId)?.[1]
                ?.name.toLowerCase()
                .includes(searchNetwork) || searchNetwork.toLowerCase() === ""
          )
          .map((instance, i) => (
            <BonadocsEditorViewPlaygroundContractModalAddContractInstancesItem
              instances={instances}
              searchNetwork={searchNetwork}
              instance={instance}
              updateInstance={update}
              key={i}
            />
          ))}
      </div>
      <div className="bonadocs__editor__projects__creation__add">
        <svg
          className="bonadocs__editor__dashboard__playground__contract__header__addIconn bonadocs__editor__projects__creation__add__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 8L12 8"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8 12L8 4"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <h3
          className="bonadocs__editor__projects__creation__add__title"
          onClick={() => setOpen(!open)}
        >
          Add network
        </h3>
      </div>
      {/* <BonadocsEditorViewPlaygroundContractModalContractItemInstancesAdd
          handleAddContractInstance={(chainId) => {
            setInstanceList([...instanceList, { chainId, address: "" }]);
            dispatch(
              setCurrentContract({
                ...contractItem,
                contractInstances: instanceList,
              })
            );

            dispatch(updateContractInstances(instanceList!));
          }}
          show={open}
          closeInstanceAddModal={() => setOpen(!open)}
          options={addOptions}
        /> */}
    </div>
  );
};
