import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { MoonLoader } from "react-spinners";

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
          <MoonLoader
            color="#fff"
            loading={true}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </Modal>
  );
};

