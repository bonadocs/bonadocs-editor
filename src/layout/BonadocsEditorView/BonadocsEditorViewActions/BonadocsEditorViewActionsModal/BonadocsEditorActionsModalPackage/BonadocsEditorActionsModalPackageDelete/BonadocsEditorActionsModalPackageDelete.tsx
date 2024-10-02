import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { Button } from "@/components/button/Button";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { deleteCustomPackage } from "@/store/package/packageSlice";
import { useCollectionContext } from "@/context/CollectionContext";

interface BonadocsEditorActionsModalPackageDeleteProps {
  name: string;
  show?: boolean;
  closeDeleteModal: () => void;
}

export const BonadocsEditorActionsModalPackageDelete: React.FC<
  BonadocsEditorActionsModalPackageDeleteProps
> = ({ name, show, closeDeleteModal }) => {
  const [open, isOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { getCollection } = useCollectionContext();

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
        <h3 className="modal__container__title">Delete Package</h3>
        <div className="modal__container__text">
          Are you certain about your decision to delete this action: {name} ?
          Please be aware that this cannot be undone.
        </div>
        <div className="modal__container__wrapper">
          <Button
            type="critical"
            onClick={async () => {
              await dispatch(
                deleteCustomPackage({
                  collection: getCollection()!,
                  name: name!,
                })
              );
              closeModal();
            }}
            className="modal__container__button"
          >
            Delete Package
          </Button>
        </div>
      </div>
    </Modal>
  );
};
