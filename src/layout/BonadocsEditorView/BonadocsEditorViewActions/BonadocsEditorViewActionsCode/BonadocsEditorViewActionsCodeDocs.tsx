import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateWorkflowActionDocs } from "@/store/action/actionSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useCollectionContext } from "@/context/CollectionContext";
import _ from "lodash";

interface BonadocsEditorViewActionsCodeDocsProps {
  docs: string;
  className?: string;
}
export const BonadocsEditorViewActionsCodeDocs: React.FC<
  BonadocsEditorViewActionsCodeDocsProps
> = ({ docs, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );
  const { getCollection } = useCollectionContext();

  const updateActionDocs = (docs: string) => {
    dispatch(
      updateWorkflowActionDocs({
        collection: getCollection()!,
        workflowId: currentAction.id,
        workflowDocs: docs,
      })
    );
  };
  // useEffect((() => {}),[JSON.STRINGIFY])
  return (
    <>
      <textarea
        onChange={(e) => updateActionDocs(e.target.value)}
        className={`bonadocs__editor__dashboard__playground__action__code__docs ${className}`}
        value={currentAction.documentation}
      />
    </>
  );
};
