import React from "react";
import { BonadocsEditorViewHeader } from "./BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewControlBar } from "./BonadocsEditorViewControlBar/BonadocsEditorViewControlBar";
import { BonadocsEditorViewPlayground } from "./BonadocsEditorViewPlayground/BonadocsEditorViewPlayground";
interface BonadocsEditorViewProps {
  className?: string;
}
export const BonadocsEditorView: React.FC<BonadocsEditorViewProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header" />
      <BonadocsEditorViewControlBar className="bonadocs__editor__dashboard__controlbar" />
      <BonadocsEditorViewPlayground className="bonadocs__editor__dashboard__playground" />
    </div>
  );
};
