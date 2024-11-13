import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { Button } from "@/components/button/Button";

interface BonadocsEditorViewPlaygroundContractModalCancelProps {
  show?: boolean;
  closeDeleteModal: () => void;
  closeEditModal: () => void;
}

export const BonadocsEditorViewPlaygroundContractModalCancel: React.FC<
  BonadocsEditorViewPlaygroundContractModalCancelProps
> = ({ show, closeDeleteModal, closeEditModal }) => {
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeDeleteModal();
  };

  return (
    <Modal
      style={customStyles}
      contentLabel="Contract Modal"
      isOpen={open}
      onRequestClose={closeModal}
    >
      <div className="modal__close" onClick={closeModal}>
        <svg
          className="modal__close__img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
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
      <div className="modal__container">
        <h3 className="modal__container__title">Close settings</h3>
        <div className="modal__container__text">
          You have unsaved changes. Closing your settings
          will discard these changes. Are you sure you want to proceed?
        </div>
        <div className="modal__container__wrapper">
          <Button
            type="inertia"
            onClick={async () => {
              closeModal();
            }}
            className="modal__container__button ma-r0"
          >
            Cancel
          </Button>
          <Button
            type="critical"
            onClick={async () => {
              closeEditModal();
            }}
            className="modal__container__button bona-black"
          >
            Discard Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
