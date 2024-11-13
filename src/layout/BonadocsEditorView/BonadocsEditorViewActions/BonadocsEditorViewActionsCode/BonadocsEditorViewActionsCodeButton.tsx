import React, { useEffect, useState } from "react";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setSimulation } from "@/store/controlBoard/controlBoardSlice";
import { workflowButtonText } from "@/store/controlBoard/controlBoardSlice";
import { useSelector } from "react-redux";
import { useCollectionContext } from "@/context/CollectionContext";
import { RootState } from "@/store";
import { Loader } from "@/components/loader/Loader";
interface BonadocsEditorViewActionsCodeButtonProps {
  // Add your props here
}

export const BonadocsEditorViewActionsCodeButton: React.FC<
  BonadocsEditorViewActionsCodeButtonProps
> = (props) => {
  const [runLoader, setRunLoader] = useState<boolean>(false);

  const { executionWorkflowButton } = useCollectionContext();
  const buttonText = useSelector(workflowButtonText);
  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );


  useEffect(() => {
    
    setRunLoader(false);
  }, [currentAction.id]);

  return (
    <div className="bonadocs__editor__dashboard__playground__action__code__button">
      <Button
        className="bonadocs__editor__dashboard__playground__action__code__button__item"
        type="action"
        disabled={runLoader}
        onClick={async () => {
          setRunLoader(true);
          setSimulation(true);
        
          await executionWorkflowButton();
          setRunLoader(false);
        }}
      >
        <>
          {buttonText === "Run" && !runLoader ? (
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/24/000000/play--v2.png"
              alt="play--v2"
            />
          ) : (
            <Loader className="spinner" />
          )}
          {buttonText}
        </>
      </Button>
    </div>
  );
};
