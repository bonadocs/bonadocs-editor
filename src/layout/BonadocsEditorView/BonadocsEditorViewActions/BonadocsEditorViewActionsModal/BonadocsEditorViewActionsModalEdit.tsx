import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { customStyles } from "@/data/toast/toastConfig";
import { useCollectionContext } from "@/context/CollectionContext";
import { ActionItem } from "@/data/dataTypes";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/ClipLoader";
import { validateString } from "@/data/variables/variableValidation";
import { renameWorkflowAction } from "@/store/action/actionSlice";

interface BonadocsEditorViewActionsModalEditProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
  actionItem: ActionItem;
}
export const BonadocsEditorViewActionsModalEdit: React.FC<
  BonadocsEditorViewActionsModalEditProps
> = ({ show, closeEditModal, actionItem }) => {
  const [actionName, setActionName] = useState<string>(actionItem.name);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const { getCollection } = useCollectionContext();

  const editAction = async () => {
    setLoading(true);

    if (!validateString(actionName)) {
      setLoading(false);
      toast.error("Action name is invalid");
      return;
    }

    if (actionItem.name !== actionName) {
      await dispatch(
        renameWorkflowAction({
          collection: getCollection()!,
          workflowName: actionName,
          workflowId: actionItem.id,
        })
      );
    }
    setLoading(false);
    closeModal();
  };

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  useEffect(() => {
    setActionName(actionItem.name);
  }, [actionItem]);

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
        <h3 className="modal__container__title">Edit Action</h3>
        <div className="modal__container__text">Action name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setActionName(event.target.value);
          }}
          value={actionName}
        />

        <div className="modal__container__wrapper">
          <Button
            disabled={loading}
            type="action"
            onClick={() => editAction()}
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
                "Edit Action"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
