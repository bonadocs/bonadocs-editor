import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { supportedChains } from "@bonadocs/core";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Option } from "@/data/dataTypes";
import { setChainId } from "@/store/controlBoard/controlBoardSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useCollectionContext } from "@/context/CollectionContext";

interface BonadocsEditorViewControlBarItemProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundMethodParamsNetworks: React.FC<
  BonadocsEditorViewControlBarItemProps
> = ({ className }) => {
  const method = useSelector((state: RootState) => state.method.methodItem);
  const chain = useSelector((state: RootState) => state.controlBoard.chainId);
  const fetchedNetworks = method.instances;
  const dispatch = useDispatch<AppDispatch>();
  const networksRef = useRef<Option[]>([]);
  const [networks, setNetworks] = useState<Option[]>([]);

  const updateNetwork = (event: ChangeEvent<HTMLSelectElement>) => {
    const chain = event.target.value;
    dispatch(setChainId(Number(chain)));
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
    networksRef.current = currentChains;
    setNetworks(currentChains);
   
    const currentChain = currentChains.find(
      (network) => network.value === chain
    );

    if (currentChain) {
      dispatch(setChainId(Number(currentChain.value)));
    } else {
      if (fetchedNetworks) {
        dispatch(setChainId(fetchedNetworks[0].chainId));
      }
    }
  }

  useEffect(() => {
    networkList();
  }, [method.fragmentKey]);

  return (
    <>
      {fetchedNetworks !== null && (
        <Dropdown
          options={networks}
          updateId={updateNetwork}
          selectedValue={chain!}
          className={`bonadocs__header__networkDropdown ${className}`}
        />
      )}
    </>
  );
};
