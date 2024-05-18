import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteWorkflowAction } from "@/store/action/actionSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { ActionItem } from "@/data/dataTypes";
import { customStyles } from "@/data/toast/toastConfig";

interface BonadocsEditorViewActionsModalDeleteProps {
  className?: string;
  show?: boolean;
  closeDeleteModal: () => void;
  actionItem: ActionItem;
}
export const BonadocsEditorViewActionsModalDelete: React.FC<
  BonadocsEditorViewActionsModalDeleteProps
> = ({ show, closeDeleteModal, actionItem }) => {
  const [open, isOpen] = useState<boolean>(false);
  const { getCollection } = useCollectionContext();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeDeleteModal();
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
        <h3 className="modal__container__title">Delete Variable</h3>
        <div className="modal__container__text">
          Are you certain about your decision to delete this variable:{" "}
          {actionItem.name} ? Please be aware that this action cannot be undone.
        </div>
        <div className="modal__container__wrapper">
          <Button
            type="critical"
            onClick={async () => {
              await dispatch(
                deleteWorkflowAction({
                  collection: getCollection()!,
                  workflowId: actionItem.id,
                })
              );
              closeModal();
            }}
            className="modal__container__button"
          >
            Delete Variable
          </Button>
        </div>
      </div>
    </Modal>
  );
};
