import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { Button } from "@/components/button/Button";
interface BonadocsEditorProjectsCreationActionContractInstanceDeleteModalProps {
  // Add any props you need for the component here
}

interface BonadocsEditorProjectsCreationActionContractInstanceDeleteModalProps {
  className?: string;
  show?: boolean;
  closeInstanceDeleteModal: () => void;
  handleDeleteContractInstance: () => void;
  networkName?: string;
  canceled?: () => void;
}

export const BonadocsEditorProjectsCreationActionContractInstanceDeleteModal: React.FC<
  BonadocsEditorProjectsCreationActionContractInstanceDeleteModalProps
> = ({
  className,
  show,
  closeInstanceDeleteModal,
  handleDeleteContractInstance,
  networkName,
  canceled,
}) => {
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeInstanceDeleteModal();
  };

  return (
    <Modal
      style={customStyles}
      contentLabel="Contract Modal"
      isOpen={open}
      onRequestClose={closeModal}
      className={className}
    >
      <div
        className="modal__close"
        onClick={() => {
          closeModal();
          canceled && canceled();
        }}
      >
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
        <h3 className="modal__container__title">Delete Action</h3>
        <div className="modal__container__text">
          Are you certain about your decision to delete this network:{" "}
          {networkName} ? Please be aware that this cannot be undone.
        </div>
        <div className="modal__container__wrapper">
          <Button
            type="critical"
            onClick={async () => {
              handleDeleteContractInstance();
              closeModal();
            }}
            className="modal__container__button"
          >
            Delete Action
          </Button>
        </div>
      </div>
    </Modal>
  );
};
