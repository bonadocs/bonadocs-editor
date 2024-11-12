import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { Loader } from "@/components/loader/Loader";

interface LoadingModalProps {
  show?: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ show }) => {
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
  };

  return (
    <Modal
      style={customStyles}
      contentLabel="Contract Modal"
      isOpen={open}
      onRequestClose={closeModal}
    >
      <div className="modal__container">
        <div className="modal__container__loader">
          <Loader className="spinner" />
        </div>
      </div>
    </Modal>
  );
};
