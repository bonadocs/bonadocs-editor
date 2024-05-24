import React from 'react';

interface BonadocsEditorActionsModalPackageAddHeaderProps {
   onClose: () => void;
}

export const BonadocsEditorActionsModalPackageAddHeader: React.FC<BonadocsEditorActionsModalPackageAddHeaderProps> = ({onClose}) => {
    // Add your component logic here

    return (
      <div className="modal__side__container__header">
        <div>
          <h1 className="modal__side__container__header__title">Packages</h1>
          <h4 className="modal__side__container__header__description">
            You can manage your packages here
          </h4>
        </div>

        <div className="modal__side__close" onClick={onClose}>
          <svg
            className="modal__side__close__img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#B8C8FF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
};