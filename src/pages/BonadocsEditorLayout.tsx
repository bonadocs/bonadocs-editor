import { BonadocsEditorSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebar";
import React from "react";

interface BonadocsEditorLayoutProps {
  children?: React.ReactNode;
}

export const BonadocsEditorLayout: React.FC<BonadocsEditorLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
      {children}
    </>
  );
};
