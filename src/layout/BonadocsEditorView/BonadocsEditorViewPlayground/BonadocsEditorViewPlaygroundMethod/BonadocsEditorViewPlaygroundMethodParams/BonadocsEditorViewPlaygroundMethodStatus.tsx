import React from "react";
import { Tab } from "@/components/tab/Tab";
interface BonadocsEditorViewPlaygroundMethodStatusProps {
  children?: React.ReactNode;
  className?: string;
}

export const BonadocsEditorViewPlaygroundMethodStatus: React.FC<
  BonadocsEditorViewPlaygroundMethodStatusProps
  > = ({ children, className }) => {
  
    return (
      <>
        <Tab className={className}>{children}</Tab>
      </>
    ); 
};
