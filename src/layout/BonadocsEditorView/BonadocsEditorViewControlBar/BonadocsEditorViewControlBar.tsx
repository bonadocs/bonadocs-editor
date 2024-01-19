import React from "react";
import { BonadocsEditorViewControlBarItem } from "./BonadocsEditorViewControlBarItem";
interface BonadocsEditorViewControlBarProps {
  className?: string;
}
export const BonadocsEditorViewControlBar: React.FC<
  BonadocsEditorViewControlBarProps
> = ({ className }) => {
  // Component code goes here
  return (
    <div className={className}>
      <BonadocsEditorViewControlBarItem>
        Interaction
      </BonadocsEditorViewControlBarItem>

      {/* <h3>Documentation</h3> */}

      <BonadocsEditorViewControlBarItem active>
        Documentation
      </BonadocsEditorViewControlBarItem>
    </div>
  );
};
