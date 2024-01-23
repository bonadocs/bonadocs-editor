import React, { useState } from "react";
import { BonadocsVariableAddModal } from "./BonadocsVariablesModal/BonadocsVariableAddModal";

interface BonadocsEditorViewVariablesHeaderProps {
  className?: string;
}

export const BonadocsEditorViewVariablesHeader: React.FC<
  BonadocsEditorViewVariablesHeaderProps
> = ({ className }) => {
  const [addWidget, setAddWidget] = useState(false);
  return (
    <div className={className}>
      <h3 className="bonadocs__editor__variables__header__title">Variables</h3>
      <div
        className="bonadocs__editor__variables__header__add"
        onClick={() => setAddWidget(!addWidget)}
      >
        <img
          width={16}
          height={16}
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1705767444/add_pijxki.svg"
        />
        Add Variable
      </div>
      <BonadocsVariableAddModal
        closeAddModal={() => setAddWidget(!addWidget)}
        show={addWidget}
      />
    </div>
  );
};
