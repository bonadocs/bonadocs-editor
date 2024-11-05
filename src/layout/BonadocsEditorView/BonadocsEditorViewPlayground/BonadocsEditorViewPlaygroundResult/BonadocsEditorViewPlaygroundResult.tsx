import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCollectionContext } from "@/context/CollectionContext";
import { BonadocsEditorViewPlaygroundResultHeader } from "./BonadocsEditorViewPlaygroundResultHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setContractDocs } from "@/store/contract/contractSlice";
import { BonadocsEditorViewPlaygroundResultControlbar } from "./BonadocsEditorViewPlaygroundResultControlbar";
import { BonadocsEditorViewPlaygroundTransactionParamsList } from "../BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundTransactionParams/BonadocsEditorViewPlaygroundTransactionParamsList";
import { BonadocsEditorViewPlaygroundResultView } from "./BonadocsEditorViewPlaygroundResultView";
import { BonadocsEditorViewPlaygroundResultTab } from "./BonadocsEditorViewPlaygroundResultTab";
import _ from "lodash";
import { BonadocsEditorViewPlaygroundResultContent } from "./BonadocsEditorViewPlaygroundResultContent";

interface BonadocsEditorViewPlaygroundResultProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundResult: React.FC<
  BonadocsEditorViewPlaygroundResultProps
> = ({ className }) => {
  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionDescription, setCollectionDescription] =
    useState<string>("");
  const { getCollection, response } = useCollectionContext();

  const dispatch = useDispatch<AppDispatch>();
  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );
  const contract = useSelector(
    (state: RootState) => state.contract.currentContract
  );
  const [docs, setDocs] = React.useState<string>(contract?.docs!);

  const dataManager = getCollection();

  const getCollectionName = async () => {
    if (dataManager) {
      const metadataView = await dataManager.getMetadataView();
      const name = await metadataView.getName();
      setCollectionName(name);
    }
  };

  const getCollectionDescription = async () => {
    if (dataManager) {
      const metadataView = await dataManager.getMetadataView();
      const description = await metadataView.getDescription();
      setCollectionDescription(description);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCurrentContractDocs = useCallback(
    _.debounce(async (docs: string) => {
      dispatch(
        setContractDocs({
          collection: getCollection()!,
          docs: docs,
          contractId: contract?.contractId,
        })
      );
    }, 2000),
    []
  );

  useEffect(() => {
    // Function to update the width
    const updateWidth = () => {
      if (parentRef.current) {
        // Measure the width of the parent component
        const width = (parentRef.current as HTMLElement).getBoundingClientRect()
          .width;
        setParentWidth(width);
      }
    };

    // Initial measurement
    updateWidth();

    // Add event listener to update width on window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup event listener when the component unmounts
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    getCollectionName();
    getCollectionDescription();
  }, []);

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
        <BonadocsEditorViewPlaygroundResultControlbar />
      )}
      <div className="bonadocs__editor__dashboard__playground__result__docs">
        {displayDoc !== "interaction" ? (
          <>
            <div className="bonadocs__editor__dashboard__playground__result__docs__title">
              {contract?.name}
            </div>
            <BonadocsEditorViewPlaygroundResultContent />
          </>
        ) : (
          <div ref={parentRef}>
            {response.length !== 0 && (
              <>
                <BonadocsEditorViewPlaygroundResultTab />
                <BonadocsEditorViewPlaygroundResultView
                  response={response}
                  parentWidth={parentWidth}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
