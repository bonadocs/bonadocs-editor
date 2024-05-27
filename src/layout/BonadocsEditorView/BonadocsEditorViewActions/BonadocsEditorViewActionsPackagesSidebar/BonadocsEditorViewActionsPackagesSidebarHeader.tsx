import React, { useState } from "react";
import { BonadocsEditorActionsModalPackageAdd } from "../BonadocsEditorViewActionsModal/BonadocsEditorActionsModalPackage/BonadocsEditorActionsModalPackageAdd/BonadocsEditorActionsModalPackageAdd";

interface BonadocsEditorViewActionsPackagesSidebarHeaderProps {
  // Add any props you need for the component here
}

export const BonadocsEditorViewActionsPackagesSidebarHeader: React.FC<
  BonadocsEditorViewActionsPackagesSidebarHeaderProps
> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="bonadocs__editor__dashboard__playground__action__list__header">
      <h3
        // ref={ref}
        className={`bonadocs__editor__dashboard__playground__contract__header__title`}
      >
        Packages
      </h3>
      {/* <svg
        onClick={() => setOpenModal(!openModal)}
        className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 8L12 8"
          stroke="#95A8C0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12L8 4"
          stroke="#95A8C0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
      <BonadocsEditorActionsModalPackageAdd
        show={openModal}
        closeAddModal={() => setOpenModal(!openModal)}
      />
    </div>
  );
};
