import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from "../BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface BonadocsEditorViewPlaygroundResultControlbarProps {
  // Add any props you need for the component here
}

export const BonadocsEditorViewPlaygroundResultControlbar: React.FC<
  BonadocsEditorViewPlaygroundResultControlbarProps
> = (props) => {
  const [output, setOutput] = useState<boolean>(false);
  const writeMethod = useSelector((state: RootState) => state.controlBoard.writeMethod);

  return (
    <div className="bonadocs__editor__dashboard__playground__method__controlbar">
      <BonadocsEditorViewPlaygroundMethodControlbarItem
        active={!writeMethod}
      >
        Output
      </BonadocsEditorViewPlaygroundMethodControlbarItem>
      <BonadocsEditorViewPlaygroundMethodControlbarItem
        active={writeMethod}
      >
        Log
      </BonadocsEditorViewPlaygroundMethodControlbarItem>
    </div>
  );
};
