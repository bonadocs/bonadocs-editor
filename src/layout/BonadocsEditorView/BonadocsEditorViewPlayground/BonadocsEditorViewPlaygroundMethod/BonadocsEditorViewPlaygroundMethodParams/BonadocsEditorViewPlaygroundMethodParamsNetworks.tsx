import React, { ChangeEvent, useEffect, useState } from "react";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { supportedChains } from "@bonadocs/core";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Option } from "@/data/dataTypes";

interface BonadocsEditorViewControlBarItemProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundMethodParamsNetworks: React.FC<
  BonadocsEditorViewControlBarItemProps
> = ({ className }) => {
  const method = useSelector((state: RootState) => state.method.methodItem);
  const fetchedNetworks = method.instances;

  const updateNetwork = (event: ChangeEvent<HTMLSelectElement>) => {
    const chain = event.target.value;
    // console.log(chain);
  };

  function networkList() {
    const untrimedChains = fetchedNetworks?.map((networkId) =>
      Array.from(supportedChains).find(
        (chain) => chain[1].chainId === networkId.chainId
      )
    );

    const currentChains: Option[] = [];

    untrimedChains?.map((chain) =>
      currentChains.push({
        label: (chain && chain[1].name) ?? "",
        value: (chain && chain[1].chainId) ?? "",
      })
    );
    
    return currentChains;
  }

  useEffect(() => {
    
    // console.log(networkList());
    
  }, [method.name]);

  return fetchedNetworks ? (
    <Dropdown
      options={networkList()}
      updateId={updateNetwork}
      selectedValue={fetchedNetworks[0].chainId}
      className={`bonadocs__header__networkDropdown ${className}`}
    />
  ) : null;
};
