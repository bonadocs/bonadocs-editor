import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/input/TextInput";
import { customStyles } from "@/data/toast/toastConfig";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Loader } from "@/components/loader/Loader";
import { deleteTeam, teamCreation } from "@/store/team/teamSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { TeamItem } from "@/data/dataTypes";

interface BonadocsEditorTeamsModalCreateProps {
  className?: string;
  show?: boolean;
  teamItem: TeamItem;
  closeDeleteModal: () => void;
}

export const BonadocsEditorTeamsModalDelete: React.FC<
  BonadocsEditorTeamsModalCreateProps
> = ({ show, closeDeleteModal, className, teamItem }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeDeleteModal();
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
        <h3 className="modal__container__title">Delete Team</h3>
        <div className="modal__container__text">
          Are you certain about your decision to delete this team:
          {teamItem.name} ? Please be aware that this cannot be undone.
        </div>
        <div className="modal__container__wrapper">
          <Button
            type="critical"
            disabled={!teamItem.name}
            onClick={async () => {
              setLoading(true);
              try {
                setLoading(true);
                dispatch(deleteTeam(teamItem.id));
                  setLoading(false);
                  closeModal();
              } catch (err) {
                setLoading(false);
              }
            }}
            className="modal__container__button"
          >
            <>{loading ? <Loader className="spinner" /> : "Delete Team"}</>
          </Button>
        </div>
      </div>
    </Modal>
  );
};