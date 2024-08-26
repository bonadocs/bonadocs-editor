import React, { useState } from "react";
import { Logo } from "@/components/logo/Logo";
import { Button } from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { BonadocsEditorProjectsCreationAction } from "./BonadocsEditorProjectsCreationAction/BonadocsEditorProjectsCreationAction";
import { BonadocsEditorProjectsCreationModal } from "./BonadocsEditorProjectsCreationAction/BonadocsEditorProjectsCreationModal";
export const BonadocsEditorProjectsCreation: React.FC = () => {
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="bonadocs__editor__projects">
      <div className="bonadocs__editor__projects__inner">
        <Logo />
        <div className="bonadocs__editor__projects__inner__header">
          <Button
            onClick={() => navigate(-1)}
            type="default"
            className="bonadocs__editor__projects__inner__header__button"
          >
            <>
              <img
                alt="go back"
                src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720339940/Arrow-Back_tn27nc.svg"
              />
              Back to Projects
            </>
          </Button>
          <Button
            className="bonadocs__editor__projects__inner__header__button"
            type="inertia"
            onClick={() => setShowImportModal(!showImportModal)}
          >
            <>
              <img
                alt="go back"
                src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720340267/Import_Icon_1_umu0bn.svg"
              />
              Import Project
            </>
          </Button>
        </div>
        <div className="bonadocs__editor__projects__inner__info">
          <h2 className="bonadocs__editor__projects__inner__info__title">
            Create New Project
          </h2>
          <h4 className="bonadocs__editor__projects__inner__info__desc">
            Bring your smart contracts to life with ease.
          </h4>
        </div>
        <BonadocsEditorProjectsCreationAction />
      </div>
      <BonadocsEditorProjectsCreationModal
        show={showImportModal}
        closeImportModal={() => setShowImportModal(!showImportModal)}
        handleImportCollection={() => {}}
      />
    </div>
  );
};
