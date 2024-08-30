import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { Button } from "@/components/button/Button";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { Option } from "@/data/dataTypes";
interface BonadocsEditorViewPlaygroundContractModalContractItemInstancesAddProps {
  className?: string;
  show?: boolean;
  closeInstanceAddModal: () => void;
  handleAddContractInstance: (chainId: number) => void;
  options: Option[];
}

export const BonadocsEditorViewPlaygroundContractModalContractItemInstancesAdd: React.FC<
  BonadocsEditorViewPlaygroundContractModalContractItemInstancesAddProps
> = ({
  className,
  show,
  closeInstanceAddModal,
  handleAddContractInstance,
  options,
}) => {
  const [open, isOpen] = useState<boolean>(false);
  const [selectedChainId, setSelectedChainId] = useState<number>(
    options[0].value as number
  );
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeInstanceAddModal();
  };

  useEffect(() => {
    setSelectedChainId(options[0].value as number);
  }, [options]);

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
        <h3 className="modal__container__title">Add Network</h3>
        <Dropdown
          options={options}
          updateId={(e) => setSelectedChainId(Number(e.target.value))}
          className="modal__container__dropdown"
        />
        <div className="modal__container__wrapper">
          <Button
            type="action"
            onClick={async () => {
              handleAddContractInstance(selectedChainId);

              closeModal();
            }}
            className="modal__container__button"
          >
            Add Network
          </Button>
        </div>
      </div>
    </Modal>
  );
};
