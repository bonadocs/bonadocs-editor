import React from "react";
import { BonadocsEditorViewHeader } from "../../layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewControlBar } from "../../layout/BonadocsEditorView/BonadocsEditorViewControlBar/BonadocsEditorViewControlBar";
import { BonadocsEditorViewPlayground } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlayground";
import { BonadocsEditorViewPlaygroundWrapper } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundWrapper";

interface BonadocsEditorContractsProps {
  className?: string;
}
export const BonadocsEditorContracts: React.FC<
  BonadocsEditorContractsProps
> = ({ className }) => {

  return (
    <div className={className}>
      <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header" />
      <BonadocsEditorViewControlBar className="bonadocs__editor__dashboard__controlbar" />
      <BonadocsEditorViewPlaygroundWrapper className="bonadocs__editor__dashboard__playground">
        <BonadocsEditorViewPlayground />
      </BonadocsEditorViewPlaygroundWrapper>
    </div>
  );
};
