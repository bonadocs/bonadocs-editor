import React from "react";
import { BonadocsEditorProjectsCreationActionContractNetworkItem } from "./BonadocsEditorProjectsCreationActionContractNetworkItem";
import { supportedChains } from "@bonadocs/core";

interface BonadocsEditorProjectsCreationActionContractNetworkListProps {
  searchValue: string;
}

export const BonadocsEditorProjectsCreationActionContractNetworkList: React.FC<
  BonadocsEditorProjectsCreationActionContractNetworkListProps
> = ({ searchValue }) => {
  const networkList = Array.from(supportedChains).map((chain) => {
    return {
      chainId: chain[1].chainId,
      name: chain[1].name,
      logo: chain[1].imageUrl,
      selected: false,
    };
  });

  console.log("networkList", networkList);

  return (
    <div className="modal__side__container__search__open__inner">
      {networkList
        .filter(
          (network) =>
            network.name.toLowerCase().includes(searchValue) ||
            searchValue.toLowerCase() === ""
        )
        .map((item) => (
          <BonadocsEditorProjectsCreationActionContractNetworkItem
            networkItem={item}
            key={item.chainId}
          />
        ))}
    </div>
  );
};
