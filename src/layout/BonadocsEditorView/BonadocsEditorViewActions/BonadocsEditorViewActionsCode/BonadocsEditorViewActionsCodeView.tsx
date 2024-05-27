import React, { useEffect, useRef, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useCollectionContext } from "@/context/CollectionContext";
import { Playground } from "@/components/playground/Playground";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateWorkflowActionCode } from "@/store/action/actionSlice";
import _ from "lodash";

interface BonadocsEditorViewActionsCodeViewProps {
  // Add any props you need for your component here
}

export const BonadocsEditorViewActionsCodeView: React.FC<
  BonadocsEditorViewActionsCodeViewProps
> = (props) => {
  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );
  const { getCollection } = useCollectionContext();
  const dispatch = useDispatch<AppDispatch>();

  const updateActionCode = (code: string) => {
    dispatch(
      updateWorkflowActionCode({
        collection: getCollection()!,
        workflowId: currentAction.id,
        code,
      })
    );
  };

  return (
    <>
      <Playground
        className="bonadocs__editor__dashboard__playground__action__code__view"
        code={currentAction.code[0]?.code}
        handleChange={(code) => updateActionCode(code!)}
      />
    </>
  );
};
