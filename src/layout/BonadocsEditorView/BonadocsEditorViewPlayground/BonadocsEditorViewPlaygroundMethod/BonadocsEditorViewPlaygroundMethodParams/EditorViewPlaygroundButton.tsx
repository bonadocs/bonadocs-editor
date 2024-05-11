import React from "react";
import { Button } from "@/components/button/Button";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";
import { methodButtonText } from "@/store/controlBoard/controlBoardSlice";
import { useCollectionContext } from "@/context/CollectionContext";

interface EditorViewPlaygroundButtonProps {
  overlayRef: HTMLDivElement;
}

export const EditorViewPlaygroundButton: React.FC<
  EditorViewPlaygroundButtonProps
> = ({ overlayRef }) => {
  const buttonText = useSelector(methodButtonText);
  const provider = useSelector(
    (state: RootState) => state.controlBoard.provider
  );
  const { executionButton } = useCollectionContext();
  return (
    <>
      {provider ? (
        <Button
          className="bonadocs__editor__view__button"
          type="action"
          children={buttonText}
          onClick={() => {
            executionButton(overlayRef);
          }}
        />
      ) : (
        <Button
          type="action"
          className="bonadocs__editor__view__button"
          onClick={() => window.open("https://metamask.io/", "_blank")}
        >
          Install metamask wallet 🦊
        </Button>
      )}
    </>
  );
};
