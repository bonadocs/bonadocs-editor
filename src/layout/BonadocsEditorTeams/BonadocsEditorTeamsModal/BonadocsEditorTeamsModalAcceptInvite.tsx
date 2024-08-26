import { Button } from "@/components/button/Button";
import { customStyles } from "@/data/toast/toastConfig";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MoonLoader } from "react-spinners";
import { getTeams, acceptInvite } from "@/store/team/teamSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";

interface BonadocsEditorTeamsModalAcceptInviteProps {
  className?: string;
  show?: boolean;
  closeInviteModal: () => void;
  inviteToken: string;
}

export const BonadocsEditorTeamsModalAcceptInvite: React.FC<
  BonadocsEditorTeamsModalAcceptInviteProps
> = ({ show, closeInviteModal, inviteToken }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    setTeamName("");
    closeInviteModal();
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
        <h3 className="modal__container__title">Invitation</h3>
        <h5 className="modal__container__text">Accept invitaion</h5>
        <div className="modal__container__wrapper">
          <Button
            type="action"
            onClick={async () => {
              setLoading(true);
              try {
                const accept = await dispatch(acceptInvite(inviteToken));
                const newTeams = await dispatch(getTeams());
                if (accept.payload === false || newTeams.payload === false) {
                  setLoading(false);
                  return;
                }
                setLoading(false);

                closeInviteModal();
                navigate({
                  pathname: "/teams",
                });
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
                "Accept"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
