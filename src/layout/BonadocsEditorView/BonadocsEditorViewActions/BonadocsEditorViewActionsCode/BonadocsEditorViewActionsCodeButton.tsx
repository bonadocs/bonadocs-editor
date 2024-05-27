import React from "react";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setSimulation } from "@/store/controlBoard/controlBoardSlice";
import { workflowButtonText } from "@/store/controlBoard/controlBoardSlice";
import { useSelector } from "react-redux";
import { useCollectionContext } from "@/context/CollectionContext";
import { RootState } from "@/store";
import MoonLoader from "react-spinners/ClipLoader";
interface BonadocsEditorViewActionsCodeButtonProps {
  // Add your props here
}

export const BonadocsEditorViewActionsCodeButton: React.FC<
  BonadocsEditorViewActionsCodeButtonProps
> = (props) => {
  const { executionWorkflowButton, getCollection } = useCollectionContext();
  const buttonText = useSelector(workflowButtonText);
  const loader = useSelector((state: RootState) => state.action.loader);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="bonadocs__editor__dashboard__playground__action__code__button">
      <Button
        className="bonadocs__editor__dashboard__playground__action__code__button__item"
        type="action"
        disabled={loader}
        onClick={() => {
          setSimulation(true);
          executionWorkflowButton();
          // getCollection()?.valueManagerView.removeLibrary(
          //   "js",
          //   `ethers@5.3.0`
          // );
        }}
      >
        <>
          {buttonText === "Run" && !loader ? (
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/24/000000/play--v2.png"
              alt="play--v2"
            />
          ) : (
            <MoonLoader
              color="#0f141b"
              loading={true}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          {buttonText}
        </>
      </Button>
    </div>
  );
};
