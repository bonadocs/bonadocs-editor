import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useCollectionContext } from "@/context/CollectionContext";
import { Playground } from "@/components/playground/Playground";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { ActionItem } from "@/data/dataTypes";
import { updateWorkflowActionCode } from "@/store/action/actionSlice";
import _ from "lodash";

interface BonadocsEditorViewActionsCodeViewProps {
  // Add any props you need for your component here
}

export const BonadocsEditorViewActionsCodeView: React.FC<
  BonadocsEditorViewActionsCodeViewProps
> = (props) => {
  const currentAction: ActionItem = useSelector(
    (state: RootState) => state.action.currentAction
  );
  const [codeState, setCodeState] = useState(currentAction.code[0]?.code);
  const { getCollection } = useCollectionContext();
  const dispatch = useDispatch<AppDispatch>();

  const updateActionCode = useCallback(
    _.debounce(async (code: string, id: string) => {
      if (code && id)
        await dispatch(
          updateWorkflowActionCode({
            collection: getCollection()!,
            workflowId: id,
            code,
          })
        );
    }, 500),
    []
  );

  useEffect(() => {
    setCodeState(currentAction.code[0]?.code);
  }, [currentAction.id]);

  return (
    <>
      <Playground
        className="bonadocs__editor__dashboard__playground__action__code__view"
        code={codeState}
        handleChange={(code) => {
          setCodeState(code!);
          updateActionCode(code!, currentAction.id);
        }}
      />
    </>
  );
};
