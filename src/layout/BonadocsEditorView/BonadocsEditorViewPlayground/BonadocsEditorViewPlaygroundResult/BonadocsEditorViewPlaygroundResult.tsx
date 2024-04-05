import React from "react";
import { useCollectionContext } from "@/context/CollectionContext";
import { BonadocsEditorViewPlaygroundResultHeader } from "./BonadocsEditorViewPlaygroundResultHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from "../BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem";
import { BonadocsEditorViewPlaygroundTransactionParamsList } from "../BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundTransactionParams/BonadocsEditorViewPlaygroundTransactionParamsList";
interface BonadocsEditorViewPlaygroundResultProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundResult: React.FC<
  BonadocsEditorViewPlaygroundResultProps
> = ({ className }) => {
  const { getCollection } = useCollectionContext();
  const collectionName = getCollection()?.data.name ?? "";
  const collectionDescription = getCollection()?.data.description ?? "";
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );

  return (
    <div className={className}>
      <BonadocsEditorViewPlaygroundResultHeader
        title={`${
          displayDoc !== "interaction"
            ? "Project Documentation"
            : "Transaction Params"
        }`}
      />
      <div className="bonadocs__editor__dashboard__playground__result__docs">
        {displayDoc !== "interaction" ? (
          <>
            <div className="bonadocs__editor__dashboard__playground__result__docs__title">
              {collectionName}
            </div>
            <div className="bonadocs__editor__dashboard__playground__result__docs__content">
              {<p>{collectionDescription}</p>}
            </div>
          </>
        ) : (
          <BonadocsEditorViewPlaygroundTransactionParamsList />
        )}
      </div>
      {displayDoc !== "interaction" ? (
        <BonadocsEditorViewPlaygroundResultHeader
          title="Contract Documentation"
          className="bona__bt"
        />
      ) : (
        <div className="bonadocs__editor__dashboard__playground__method__controlbar">
          <BonadocsEditorViewPlaygroundMethodControlbarItem
            active={false}
            onClick={() => {
              // setPreview(false);
            }}
          >
            Output
          </BonadocsEditorViewPlaygroundMethodControlbarItem>
          <BonadocsEditorViewPlaygroundMethodControlbarItem
            active={true}
            onClick={() => {
              // setPreview(true);
            }}
          >
            Log
          </BonadocsEditorViewPlaygroundMethodControlbarItem>
        </div>
      )}
      <div className="bonadocs__editor__dashboard__playground__result__docs">
        {displayDoc !== "interaction" ? (
          <>
            <div className="bonadocs__editor__dashboard__playground__result__docs__title">
              Pancake V3 Protocol
            </div>
            <div className="bonadocs__editor__dashboard__playground__result__docs__content">
              <p>
                The PancakeSwap V3 protocol is a decentralized exchange (DEX)
                built on the Binance Smart Chain (BSC). It consists of the
                following contracts:
              </p>
            </div>
          </>
        ) : (
          <div>
            <input type="text" placeholder="Search for a method" />
          </div>
        )}
      </div>
    </div>
  );
};
