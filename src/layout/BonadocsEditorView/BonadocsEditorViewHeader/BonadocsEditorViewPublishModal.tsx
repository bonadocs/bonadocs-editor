import { Button } from "@/components/button/Button";
import { customStyles } from "@/data/toast/toastConfig";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

interface BonadocsEditorViewPublishModalProps {
  className?: string;
  show?: boolean;
  uri: string;
  closePublishModal: () => void;
}

export const BonadocsEditorViewPublishModal: React.FC<
  BonadocsEditorViewPublishModalProps
> = ({ className, show, uri, closePublishModal }) => {
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closePublishModal();
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
        <h3 className="modal__container__title">Public Playground</h3>
        <div className="modal__container__text">
          Playground:  
         <span> {`playground.bonadocs.com/contracts?uri=${uri}`}</span> 
        </div>
        <div className="modal__container__wrapper">
          <Button
            type="action"
            onClick={async () => {
              navigator.clipboard.writeText(
                `playground.bonadocs.com/contracts?uri=${uri}`
              );
              toast.success("Copied to clipboard");
            }}
            className="modal__container__button"
          >
            Copy To Clipboard
          </Button>
        </div>
      </div>
    </Modal>
  );
};
