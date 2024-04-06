import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from "../BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem";

interface BonadocsEditorViewPlaygroundResultControlbarProps {
  // Add any props you need for the component here
}

export const BonadocsEditorViewPlaygroundResultControlbar: React.FC<
  BonadocsEditorViewPlaygroundResultControlbarProps
> = (props) => {
  const [output, setOutput] = useState<boolean>(false);

  return (
    <div className="bonadocs__editor__dashboard__playground__method__controlbar">
      <BonadocsEditorViewPlaygroundMethodControlbarItem
        active={output}
        onClick={() => {
          setOutput(true);
        }}
      >
        Output
      </BonadocsEditorViewPlaygroundMethodControlbarItem>
      <BonadocsEditorViewPlaygroundMethodControlbarItem
        active={!output}
        onClick={() => {
          setOutput(false);
        }}
      >
        Log
      </BonadocsEditorViewPlaygroundMethodControlbarItem>
    </div>
  );
};
