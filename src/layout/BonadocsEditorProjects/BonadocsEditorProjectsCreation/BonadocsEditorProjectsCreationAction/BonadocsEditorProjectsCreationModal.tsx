import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/input/TextInput";
import { customStyles } from "@/data/toast/toastConfig";
import MoonLoader from "react-spinners/ClipLoader";
import { addCollection, importCollection } from "@/store/project/projectSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { CollectionDataManager } from "@bonadocs/core";
import { useCollectionContext } from "@/context/CollectionContext";
import { useNavigate } from "react-router-dom";

interface BonadocsEditorProjectsCreationModalProps {
  className?: string;
  show?: boolean;
  closeImportModal: () => void;
  handleImportCollection: () => void;
}

export const BonadocsEditorProjectsCreationModal: React.FC<
  BonadocsEditorProjectsCreationModalProps
> = ({ show, closeImportModal, handleImportCollection }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { setCollection } = useCollectionContext();

  const navigate = useNavigate();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeImportModal();
  };

  return (
    <Modal
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
        <h3 className="modal__container__title">Import Project</h3>
        <h5 className="modal__container__text">IPFS URI</h5>
        <TextInput
          value={collectionName}
          handleChange={(e) => {
            setCollectionName(e.target.value);
          }}
          placeholder="Enter the project's IPFS URI"
        />
        <div className="modal__container__wrapper">
          <Button
            type="action"
            onClick={async () => {
              setLoading(true);
              const importedCollection = await dispatch(
                importCollection(collectionName)
              );
              
              if (!importedCollection.payload) {
                setLoading(false);
                return;
              }
              dispatch(
                addCollection(
                  importedCollection.payload as CollectionDataManager
                )
              );
              // setCollection(
              //   importedCollection.payload as CollectionDataManager
              // );
              setLoading(false);

              closeModal();
              // navigate({
              //   pathname: "/contracts"
              // });
            }}
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
                "Import Project"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
