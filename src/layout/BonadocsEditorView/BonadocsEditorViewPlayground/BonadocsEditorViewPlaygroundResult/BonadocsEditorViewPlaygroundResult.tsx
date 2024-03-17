import React from "react";
import { useCollectionContext } from "@/context/CollectionContext";
import { BonadocsEditorViewPlaygroundResultHeader } from "./BonadocsEditorViewPlaygroundResultHeader";
interface BonadocsEditorViewPlaygroundResultProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundResult: React.FC<
  BonadocsEditorViewPlaygroundResultProps
> = ({ className }) => {
  
  return (
    <div className={className}>
      <BonadocsEditorViewPlaygroundResultHeader />
      <div className="bonadocs__editor__dashboard__playground__result__docs">
        <div className="bonadocs__editor__dashboard__playground__result__docs__title">
          Pancake V3 Protocol
        </div>
        <div className="bonadocs__editor__dashboard__playground__result__docs__content">
          <p>
            The PancakeSwap V3 protocol is a decentralized exchange (DEX) built
            on the Binance Smart Chain (BSC). It consists of the following
            contracts:
          </p>
        </div>
      </div>
      <BonadocsEditorViewPlaygroundResultHeader className="bona__bt" />
      <div className="bonadocs__editor__dashboard__playground__result__docs">
        <div className="bonadocs__editor__dashboard__playground__result__docs__title">
          Pancake V3 Protocol
        </div>
        <div className="bonadocs__editor__dashboard__playground__result__docs__content">
          <p>
            The PancakeSwap V3 protocol is a decentralized exchange (DEX) built
            on the Binance Smart Chain (BSC). It consists of the following
            contracts: 
          </p>
        </div>
      </div>
    </div>
  );
};
