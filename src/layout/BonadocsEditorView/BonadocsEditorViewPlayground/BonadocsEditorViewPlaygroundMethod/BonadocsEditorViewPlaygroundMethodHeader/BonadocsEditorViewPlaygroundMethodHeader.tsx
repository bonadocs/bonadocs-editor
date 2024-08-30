import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewPlaygroundMethodWidgetModal } from "../BonadocsEditorViewPlaygroundMethodWidgetModal/BonadocsEditorViewPlaygroundMethodWidgetModal";

export const BonadocsEditorViewPlaygroundMethodHeader: React.FC = () => {
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );
  const [open, isOpen] = useState<boolean>(false);
  const methodItem = useSelector((state: RootState) => state.method.methodItem);

  return (
    <div className="bonadocs__editor__dashboard__playground__method__header">
      <h3 className="bonadocs__editor__dashboard__playground__method__header__title">
        {displayDoc !== "interaction"
          ? "Method Documentation"
          : "Method params"}
      </h3>
      {methodItem.name && (
        <h3
          onClick={() => isOpen(!open)}
          className="bonadocs__editor__dashboard__playground__method__header__text"
        >
          Generate Widget
        </h3>
      )}
      <BonadocsEditorViewPlaygroundMethodWidgetModal
        show={open}
        closeWidgetModal={() => isOpen(!open)}
      />
    </div>
  );
};
