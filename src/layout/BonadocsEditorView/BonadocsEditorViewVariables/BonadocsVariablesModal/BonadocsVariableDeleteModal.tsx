import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/button/Button";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.80)",
  },
  content: {
    display: "grid",
    top: "40%",
    left: "50%",
    border: "none",
    // overflowY: "hidden",
    borderRadius: "8px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "min-content",
    minHeight: "20rem",
    maxHeight: "70rem",
    backgroundColor: "transparent",
    width: "35%",
  },
};

interface BonadocsVariableDeleteModalProps {
  className?: string;
  show?: boolean;
  closeDeleteModal: () => void;
}
export const BonadocsVariableDeleteModal: React.FC<
  BonadocsVariableDeleteModalProps
> = ({ show, closeDeleteModal }) => {
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    // console.log(show);
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeDeleteModal();
  };

  return (
    <Modal
      // className='dsds'
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="modal__container">
        <h3 className="modal__container__title">Delete Variable</h3>
        <div className="modal__container__text">
          Are you certain about your decision to delete this variable? Please be
          aware that this action cannot be undone.
        </div>
        <div className="modal__container__wrapper">
          <Button type="critical" onClick={() => {}} className="modal__container__button">Delete Variable</Button>
        </div>
      </div>
    </Modal>
  );
};
