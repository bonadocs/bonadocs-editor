import React from "react";
import { BonadocsEditorSidebar } from "./BonadocsEditorSidebar/BonadocsEditorSidebar";
import { BonadocsEditorView } from "../pages/BonadocsEditorView";
import { BrowserRouter } from "react-router-dom";
export const BonadocsEditorContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bonadocs__editor">
        <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
        <BonadocsEditorView className="bonadocs__editor__dashboard" />
      </div>
    </BrowserRouter>
  );
};
