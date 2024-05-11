import React from "react";
import { Button } from "@/components/button/Button";
import { ReactComponent as RunIcon } from "@/assets/action/run.svg";
import { workflowButtonText } from "@/store/controlBoard/controlBoardSlice";
import { useSelector } from "react-redux";

interface BonadocsEditorViewActionsCodeButtonProps {
  // Add your props here
}

export const BonadocsEditorViewActionsCodeButton: React.FC<
  BonadocsEditorViewActionsCodeButtonProps
> = (props) => {
  const buttonText = useSelector(workflowButtonText);
  return (
    <div className="bonadocs__editor__dashboard__playground__action__code__button">
      <Button
        className="bonadocs__editor__dashboard__playground__action__code__button__item"
        type="action"
        onClick={() => {}}
      >
        <>
          {buttonText === "Run" && (
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/24/000000/play--v2.png"
              alt="play--v2"
            />
          )}
          {buttonText}
        </>
      </Button>
    </div>
  );
};
