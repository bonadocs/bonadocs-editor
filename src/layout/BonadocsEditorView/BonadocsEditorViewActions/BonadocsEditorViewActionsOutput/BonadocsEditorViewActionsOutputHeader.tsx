import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from "../../BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem";

interface BonadocsEditorViewActionsOutputHeaderProps {}

const BonadocsEditorViewActionsOutputHeader: React.FC<
  BonadocsEditorViewActionsOutputHeaderProps
> = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="bonadocs__editor__dashboard__playground__method__controlbar">
      {/* <BonadocsEditorViewPlaygroundMethodControlbarItem
        onClick={() => {
          setActive(!active);
        }}
        active={active}
      >
        Output
      </BonadocsEditorViewPlaygroundMethodControlbarItem> */}
      <BonadocsEditorViewPlaygroundMethodControlbarItem active={active}>
        Console
      </BonadocsEditorViewPlaygroundMethodControlbarItem>
    </div>
  );
};

export default BonadocsEditorViewActionsOutputHeader;
