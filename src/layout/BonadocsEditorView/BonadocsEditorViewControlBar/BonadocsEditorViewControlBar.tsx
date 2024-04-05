import React from "react";
import { BonadocsEditorViewControlBarItem } from "./BonadocsEditorViewControlBarItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setPlaygroundState } from "@/store/controlBoard/controlBoardSlice";
interface BonadocsEditorViewControlBarProps {
  className?: string;
}
export const BonadocsEditorViewControlBar: React.FC<
  BonadocsEditorViewControlBarProps
> = ({ className }) => {
  const playgroundState = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={className}>
      <BonadocsEditorViewControlBarItem
        active={playgroundState === "interaction"}
        onClick={() => dispatch(setPlaygroundState("interaction"))}
      >
        Interaction
      </BonadocsEditorViewControlBarItem>

      <BonadocsEditorViewControlBarItem
        active={playgroundState === "documentation"}
        onClick={() => {
          dispatch(setPlaygroundState("documentation"));
        }}
      >
        Documentation
      </BonadocsEditorViewControlBarItem>
    </div>
  );
};
