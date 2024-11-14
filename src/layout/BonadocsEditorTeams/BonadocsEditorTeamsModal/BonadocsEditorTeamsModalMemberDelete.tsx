import { Button } from "@/components/button/Button";
import { customStyles } from "@/data/toast/toastConfig";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Loader } from "@/components/loader/Loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { revokeTeamMember } from "@/store/team/teamSlice";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import path from "path";

interface BonadocsEditorTeamsModalMemberDeleteProps {
  className?: string;
  show?: boolean;
  memberId: number;
  closeDeleteModal: () => void;
  email: string;
  updateMembers: () => void;
}

export const BonadocsEditorTeamsModalMemberDelete: React.FC<
  BonadocsEditorTeamsModalMemberDeleteProps
> = ({ className, show, memberId, closeDeleteModal, email, updateMembers }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const updateTeamMembers = () => {
    if (user && user.email === email) {
      navigate({
        pathname: `/`,
      });
    } else {
      updateMembers();
    }

    closeModal();
  };

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
        <h3 className="modal__container__title">Revoke access</h3>
        <h5 className="modal__container__text">
          You're about to revoke {email} access to this team.
        </h5>
        <div className="modal__container__wrapper">
          <Button
            type="action"
            onClick={async () => {
              setLoading(true);
              try {
                const revoke = await dispatch(
                  revokeTeamMember(memberId.toString())
                );
                if (revoke.payload === false) return;

                updateTeamMembers();
              } catch (err) {
                setLoading(false);
                console.log(err);
                toast.error(String(err));
               
              }
            }}
            className="modal__container__button"
          >
            <>{loading ? <Loader className="spinner" /> : "Revoke access"}</>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
