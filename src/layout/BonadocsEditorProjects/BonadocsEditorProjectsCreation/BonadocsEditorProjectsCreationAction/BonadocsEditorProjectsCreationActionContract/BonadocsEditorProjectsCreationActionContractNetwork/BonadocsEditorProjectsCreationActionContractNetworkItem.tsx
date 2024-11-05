import { CheckboxInput } from "@/components/input/CheckboxInput";
import { ContractInstance } from "@/data/dataTypes";
import { AppDispatch, RootState } from "@/store";
import {
  setCurrentContract,
  updateContractInstances,
} from "@/store/project/projectSlice";
import { Tooltip } from "react-tooltip";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface BonadocsEditorProjectsCreationActionContractNetworkItemProps {
  networkItem: {
    chainId: number;
    name: string;
    logo: string;
    selected: boolean;
  };
}

export const BonadocsEditorProjectsCreationActionContractNetworkItem: React.FC<
  BonadocsEditorProjectsCreationActionContractNetworkItemProps
> = ({ networkItem }) => {
  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );

  const dispatch = useDispatch<AppDispatch>();
  const selectedNetwork = () => {
    const validInstance = currentContract.contractInstances?.find(
      (instance) => instance.chainId === networkItem.chainId
    );
    return validInstance ? true : false;
  };
  const [selectNetwork, setSelectNetwork] = useState<boolean>(
    selectedNetwork()
  );

  useEffect(() => { }, [networkItem.selected]);
  
  console.log(networkItem);
  

  return (
    <div className="modal__side__container__search__open__item">
      <img src={networkItem.logo} alt="network logo" />
      <h2 className="modal__side__container__search__open__item__text">
        {networkItem.name}
      </h2>
      <CheckboxInput
        handleChange={(checkState) => {
          if (checkState) {
            let instances = currentContract.contractInstances?.slice();
            instances?.push({
              chainId: networkItem.chainId,
              name: networkItem.name,
              logo: networkItem.logo,
              address: "",
              abi: "",
            });
            dispatch(
              setCurrentContract({
                ...currentContract,
                contractInstances: instances,
              })
            );

            dispatch(updateContractInstances(instances!));
          } else {
            let instances = currentContract.contractInstances?.slice();

            instances = instances?.filter(
              (instance) => instance.chainId !== networkItem.chainId
            );

            dispatch(
              setCurrentContract({
                ...currentContract,
                contractInstances: instances,
              })
            );

            dispatch(updateContractInstances(instances!));
          }
          setSelectNetwork(checkState);

          !checkState
            ? toast.info(`${networkItem.name} removed`)
            : toast.success(`${networkItem.name} selected`);
        }}
        checked={selectNetwork}
        id={networkItem.chainId.toString()}
        dynamic={false}
        className={`modal__side__container__search__open__item__input ${networkItem.name
          .split(" ")
          .join("")}`}
      />

      {selectNetwork && (
        <Tooltip
          opacity={1}
          clickable
          anchorSelect={`.${networkItem.name.split(" ").join("")}`}
        >
          Switching this off will delete the contract instance on the{" "}
          {networkItem.name} network
        </Tooltip>
      )}
    </div>
  );
};
