import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { customStyles } from "@/data/toast/toastConfig";

import { ProjectItem } from "@/data/dataTypes";
import { Loader } from "@/components/loader/Loader";
import { updateProjectName } from "@/store/project/projectSlice";

interface BonadocsEditorProjectsModalEditProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
  projectItem: ProjectItem;
}

const BonadocsEditorProjectsModalEdit: React.FC<
  BonadocsEditorProjectsModalEditProps
> = ({ className, show, closeEditModal, projectItem }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>(projectItem.name);
  const dispatch = useDispatch<AppDispatch>();

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
        <h3 className="modal__container__title">Edit Project</h3>
        <div className="modal__container__text">Project name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setProjectName(event.target.value);
          }}
          value={projectName}
        />

        <div className="modal__container__wrapper">
          <Button
            disabled={loading}
            type="action"
            onClick={async () => {
              setLoading(true);
              try {
                setLoading(true);
                await dispatch(
                  updateProjectName({ ...projectItem, name: projectName })
                );
                setLoading(false);
                closeModal();
              } catch (err) {
                setLoading(false);
              }
            }}
            className="modal__container__button"
          >
            <>
              {loading ? <Loader className="spinner" /> : "Edit Project name"}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BonadocsEditorProjectsModalEdit;
