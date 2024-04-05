import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateCollectionVariables } from "@/store/variable/variableSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { customStyles } from "@/data/toast/toastConfig";
import { toast } from "react-toastify";
import { validateString } from "@/data/variables/variableValidation";
import MoonLoader from "react-spinners/ClipLoader";

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
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { getCollection } = useCollectionContext();

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    setVariableName("");
    setVariableValue("");
    isOpen(!open);
    closeAddModal();
  };

  const addVariable = async () => {
    setLoading(true);
    const newVariable = {
      name: variableName,
      value: variableValue,
    };
    if (!validateString(variableName) || !validateString(variableValue)) {
      setLoading(false);
      toast.error("Variable name or value cannot be empty");
      return;
    }
    const existingVariable = variables.find(
      (variable) => variable.name === variableName
    );

    if (existingVariable) {
      setLoading(false);
      toast.error("Variable already exists");
      return;
    }

    await dispatch(
      updateCollectionVariables({
        collection: getCollection()!,
        variable: newVariable,
      })
    );
    setLoading(false);
    closeModal();
    toast("Variable successfully added.");
  };

  const variables = useSelector(
    (state: RootState) => state.variable.collectionVariables
  );

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
        <h3 className="modal__container__title">Add Variable</h3>
        <div className="modal__container__text">Variable name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setVariableName(event.target.value.trim())
          }
          value={variableName}
        />
        <div className="modal__container__text">Variable value</div>
        <TextInput
          placeholder="value"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setVariableValue(event.target.value.trim())
          }
          value={variableValue}
        />
        <div className="modal__container__wrapper">
          <Button
            disabled={loading}
            type="action"
            onClick={() => addVariable()}
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
                "Add Variable"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
