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
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { validateString } from "@/data/variables/variableValidation";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const { getCollection } = useCollectionContext();

  const variables = useSelector(
    (state: RootState) => state.variable.collectionVariables
  );

  const editVariable = async () => {
    setLoading(true);
    const newVariable = {
      name: variableName.trim(),
      value: variableValue.trim(),
    };
    if (
      !validateString(newVariable.name) ||
      !validateString(newVariable.value)
    ) {
      setLoading(false);
      toast.error("Variable name/value is invalid");
      return;
    }
    const existingVariable = variables.find((variable) =>
      JSON.stringify(variable) !== JSON.stringify(variableItem)
        ? variable.name === newVariable.name
        : false
    );

    if (existingVariable) {
      toast.error("Variable already exists");
      setLoading(false);
      return;
    }

    if (variableItem.name !== newVariable.name) {
      await dispatch(
        renameVariable({
          collection: getCollection()!,
          oldName: variableItem.name,
          newName: newVariable.name,
        })
      );
    }

    await dispatch(
      updateCollectionVariables({
        collection: getCollection()!,
        variable: newVariable,
      })
    );
    setLoading(false);
    closeModal();
    toast("Successfully edited");
  };

  useEffect(() => {
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
        <h3 className="modal__container__title">Edit Variable</h3>
        <div className="modal__container__text">Variable name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
            disabled={loading}
            type="action"
            onClick={() => editVariable()}
            className="modal__container__button"
          >
            <>
              {loading ? (
                <MoonLoader
                  color="#fff"
                  loading={true}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Edit Variable"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
