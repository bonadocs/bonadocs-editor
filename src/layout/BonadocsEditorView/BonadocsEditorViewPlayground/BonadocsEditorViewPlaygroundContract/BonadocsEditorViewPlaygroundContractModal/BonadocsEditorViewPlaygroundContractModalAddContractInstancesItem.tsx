import { TextInput } from "@/components/input/TextInput";
import { ContractInstance, ContractsState } from "@/data/dataTypes";
import { supportedChains } from "@bonadocs/core";
import clsx from "clsx";
import React, { useState, useEffect } from "react";

interface BonadocsEditorViewPlaygroundContractModalAddContractInstancesItemProps {
  instances: ContractInstance[];
  instance: ContractInstance;
  searchNetwork: string;
  updateInstance: (
    version: string,
    instance: ContractInstance,
    address?: string
  ) => void;
}

export const BonadocsEditorViewPlaygroundContractModalAddContractInstancesItem: React.FC<
  BonadocsEditorViewPlaygroundContractModalAddContractInstancesItemProps
> = ({ instances, searchNetwork, updateInstance, instance }) => {
  const [networkAddress, setNetworkAddress] = useState<string>("");
  const [openNetwork, setOpenNetwork] = useState<boolean>(false);

  const network = (chainId: number) =>
    Array.from(supportedChains).find((chain) => chain[1].chainId === chainId);

  useEffect(() => { console.log(instance);
   setNetworkAddress(instance.address)}, [instance.address, instance.chainId]);
  return (
    <>
      <div
        onClick={() => setOpenNetwork(!openNetwork)}
        className={clsx(
          "bonadocs__editor__projects__creation__selection__item",
          openNetwork &&
            "bonadocs__editor__projects__creation__selection__item__active"
        )}
      >
        <img
          className="bonadocs__editor__projects__creation__selection__item__image"
          src={network(instance.chainId)?.[1].imageUrl}
          alt="logo"
        />
        <h2 className="bonadocs__editor__projects__creation__selection__item__name">
          {network(instance.chainId)?.[1].name}
        </h2>
        <img
          alt="arrow down"
          className={clsx(
            "bonadocs__editor__projects__creation__selection__item__icon",
            openNetwork &&
              "bonadocs__editor__projects__creation__selection__item__icon__active"
          )}
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1721372197/Arrow_Down_vml65f.svg"
        />
      </div>
      <>
        {openNetwork && (
          <div className="bonadocs__editor__projects__creation__selection__item__deets">
            <h2 className="bonadocs__editor__projects__creation__selection__item__deets__header">
              Contract address
            </h2>
            <TextInput
              placeholder="eg. 0x0123456789ABCDEF0123456789ABCDEF01234567"
              value={networkAddress}
              handleChange={(e) => {
                setNetworkAddress(e.target.value);
                updateInstance("edit", instance, e.target.value);
              }}
            />

            <h2
              className="bonadocs__editor__projects__creation__selection__item__deets__delete"
              onClick={() => {
                updateInstance("delete", instance);
              }}
            >
              Delete Instance
            </h2>
          </div>
        )}
      </>
    </>
  );
};
