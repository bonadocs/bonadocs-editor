import React from "react";
import { BonadocsEditorSidebar } from "./BonadocsEditorSidebar/BonadocsEditorSidebar";
import { BonadocsEditorView } from "./BonadocsEditorView/BonadocsEditorView";

export const BonadocsEditorContainer: React.FC = () => {
  return (
    <div className="bonadocs__editor">
      <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
      <BonadocsEditorView className="bonadocs__editor__dashboard" />
    </div>
  );
};
