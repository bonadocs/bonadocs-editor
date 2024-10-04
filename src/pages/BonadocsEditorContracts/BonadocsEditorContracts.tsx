import React, { useEffect } from "react";
import { BonadocsEditorViewHeader } from "../../layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewControlBar } from "../../layout/BonadocsEditorView/BonadocsEditorViewControlBar/BonadocsEditorViewControlBar";
import { BonadocsEditorViewPlayground } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlayground";
import { BonadocsEditorViewPlaygroundWrapper } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundWrapper";
import { BonadocsEditorLayout } from "../BonadocsEditorLayout";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface BonadocsEditorContractsProps {
  className?: string;
}
export const BonadocsEditorContracts: React.FC<
  BonadocsEditorContractsProps
> = ({ className }) => {
  const warningBar = useSelector(
    (state: RootState) => state.controlBoard.warningBar
  );

  return (
    <div className={className}>
      {warningBar && (
        <BonadocsEditorViewHeader
          warningHeader
          className="bonadocs__editor__dashboard__header ma-bottom"
        />
      )}
      <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header" />
      <BonadocsEditorViewControlBar className="bonadocs__editor__dashboard__controlbar" />
      <BonadocsEditorViewPlaygroundWrapper className="bonadocs__editor__dashboard__playground">
        <BonadocsEditorViewPlayground />
      </BonadocsEditorViewPlaygroundWrapper>
    </div>
  );
};
