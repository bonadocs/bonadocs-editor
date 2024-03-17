import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { customStyles } from "@/data/toast/toastConfig";
import {
  renameVariable,
  updateCollectionVariables,
} from "@/store/variable/variableSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { VariableItem } from "@/data/dataTypes";


interface BonadocsVariableEditModalProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
  variableItem: VariableItem;
}
export const BonadocsVariableEditModal: React.FC<
  BonadocsVariableEditModalProps
> = ({ show, closeEditModal, variableItem }) => {
  const [variableName, setVariableName] = useState<string>(variableItem.name);
  const [variableValue, setVariableValue] = useState<string>(
    variableItem.value || ""
  );

  const [open, isOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const { getCollection } = useCollectionContext();

  useEffect(() => {
    console.log("variable", variableItem);
    isOpen(show ?? false);
  }, [show]);

  useEffect(() => {
    setVariableName(variableItem.name);
    setVariableValue(variableItem.value || "");
  }, [variableItem]);

  const closeModal = () => {
    isOpen(!open);
    closeEditModal();
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
        <h3 className="modal__container__title">Edit Variable</h3>
        <div className="modal__container__text">Variable name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);

            setVariableName(event.target.value);
          }}
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
            onClick={async () => {
              const newVariable = { name: variableName, value: variableValue };
              if (variableItem.name !== variableName) {
                await dispatch(
                  renameVariable({
                    collection: getCollection()!,
                    oldName: variableItem.name,
                    newName: variableName,
                  })
                );
              }

              await dispatch(
                updateCollectionVariables({
                  collection: getCollection()!,
                  variable: newVariable,
                })
              );
            }}
            className="modal__container__button"
          >
            Edit Variable
          </Button>
        </div>
      </div>
    </Modal>
  );
};
