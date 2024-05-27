import React, { useCallback, useEffect } from "react";
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
  const { getCollection, response } = useCollectionContext();
  const collectionName = getCollection()?.data.name ?? "";
  const collectionDescription = getCollection()?.data.description ?? "";
  const dispatch = useDispatch<AppDispatch>();
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );
  const contract = useSelector(
    (state: RootState) => state.contract.currentContract
  );
  const [docs, setDocs] = React.useState<string>(contract?.docs!);

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
          <div>
            {response.length !== 0 && (
              <>
                <BonadocsEditorViewPlaygroundResultTab />
                <BonadocsEditorViewPlaygroundResultView response={response} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
