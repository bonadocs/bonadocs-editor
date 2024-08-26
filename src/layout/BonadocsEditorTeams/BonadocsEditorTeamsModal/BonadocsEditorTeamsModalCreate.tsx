import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/input/TextInput";
import { customStyles } from "@/data/toast/toastConfig";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MoonLoader } from "react-spinners";
import { teamCreation } from "@/store/team/teamSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

interface BonadocsEditorTeamsModalCreateProps {
  className?: string;
  show?: boolean;
  closeCreateModal: () => void;
}

export const BonadocsEditorTeamsModalCreate: React.FC<
  BonadocsEditorTeamsModalCreateProps
> = ({ show, closeCreateModal, className }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    setTeamName("");
    closeCreateModal();
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
        <h3 className="modal__container__title">Create Team</h3>
        <h5 className="modal__container__text">Team Name</h5>
        <TextInput
          value={teamName}
          handleChange={(e) => {
            setTeamName(e.target.value);
          }}
          placeholder="Enter the project's name"
        />
        <div className="modal__container__wrapper">
          <Button
            type="action"
            disabled={!teamName}
            onClick={async () => {
              setLoading(true);
              try {
                const creation = await dispatch(teamCreation(teamName));
                if (creation.payload === false) {
                  setLoading(false);
                  return;
                }
                setLoading(false);
                closeCreateModal();
              } catch (err) {
                setLoading(false);
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
                "Create Team"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
