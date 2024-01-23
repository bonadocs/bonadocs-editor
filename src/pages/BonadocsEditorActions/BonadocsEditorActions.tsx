import React from "react";
import { BonadocsEditorViewHeader } from "../../layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewControlBar } from "../../layout/BonadocsEditorView/BonadocsEditorViewControlBar/BonadocsEditorViewControlBar";
import { BonadocsEditorViewPlayground } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlayground";
import { BonadocsEditorViewPlaygroundWrapper } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundWrapper";
interface BonadocsEditorActionsProps {
  className?: string;
}
export const BonadocsEditorActions: React.FC<BonadocsEditorActionsProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header" />
      <BonadocsEditorViewPlaygroundWrapper className="bonadocs__editor__dashboard__playground">
        <BonadocsEditorViewControlBar className="bonadocs__editor__dashboard__controlbar" />
        <BonadocsEditorViewPlayground />
      </BonadocsEditorViewPlaygroundWrapper>
    </div>
  );
};
