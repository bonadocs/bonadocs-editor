import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { customStyles } from "@/data/toast/toastConfig";
import { useCollectionContext } from "@/context/CollectionContext";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/ClipLoader";
import { validateString } from "@/data/variables/variableValidation";
import { createWorkflowAction } from "@/store/action/actionSlice";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { supportedChains } from "@bonadocs/core";

interface BonadocsEditorViewActionsModalAddProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
}

export const BonadocsEditorViewActionsModalAdd: React.FC<
  BonadocsEditorViewActionsModalAddProps
> = ({ show, closeEditModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actionName, setActionName] = useState<string>("");
  const [open, isOpen] = useState<boolean>(false);
  
  const dispatch: AppDispatch = useDispatch();

  const { getCollection } = useCollectionContext();

  const options = Array.from(supportedChains).map((instance) => {
    return {
      label: instance[1].name,
      value: instance[1].chainId,
    };
  });

  const [selectedChainId, setSelectedChainId] = useState<number>(
    options[0].value as number
  );

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

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
        <h3 className="modal__container__title">Create action</h3>
        <div className="modal__container__text">Action name</div>

        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setActionName(event.target.value);
          }}
          value={actionName}
        />

        <div className="modal__container__text">Action network</div>

        <Dropdown
          options={options}
          updateId={(e) => setSelectedChainId(Number(e.target.value))}
          className="modal__container__dropdown"
        />

        <div className="modal__container__wrapper">
          <Button
            disabled={loading || actionName === "" || !selectedChainId} 
            type="action"
            onClick={() => {
              setLoading(true);
              try {
                if (!validateString(actionName)) {
                  setLoading(false);
                  toast.error("Action name is invalid");
                  return;
                }
          
                
                dispatch(
                  createWorkflowAction({
                    workflowName: actionName.replace(/\s+/g, ""),
                    collection: getCollection()!,
                    workflowChainId: selectedChainId,
                  })
                );
                setLoading(false);
                setActionName("");
                closeModal();
                toast.success("Action created");
              } catch {
                setLoading(false);
                toast.error("Error creating action");
              }
            }}
            className="modal__container__button"
          >
            <>
              {loading ? (
                <MoonLoader
                  color="#fff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Create action"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
