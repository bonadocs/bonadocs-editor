import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
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

interface BonadocsVariableAddModalProps {
  className?: string;
  show?: boolean;
  closeAddModal: () => void;
}
export const BonadocsVariableAddModal: React.FC<
  BonadocsVariableAddModalProps
> = ({ show, closeAddModal }) => {
  const [variableName, setVariableName] = useState<string>("");
  const [variableValue, setVariableValue] = useState<string>("");
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    // console.log(show);
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeAddModal();
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
        <h3 className="modal__container__title">Add Variable</h3>
        <div className="modal__container__text">Variable name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setVariableName(event.target.value)
          }
          value={variableName}
        />
        <div className="modal__container__text">Variable value</div>
        <TextInput
          placeholder="value"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setVariableValue(event.target.value)
          }
          value={variableValue}
        />
        <div className="modal__container__wrapper">
          <Button
            type="action"
            onClick={() => {}}
            className="modal__container__button"
          >
            Add Variable
          </Button>
        </div>
      </div>
    </Modal>
  );
};
