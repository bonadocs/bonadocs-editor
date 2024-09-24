import React, { useEffect, useState } from "react";
import { customStyles } from "@/data/toast/toastConfig";
import Modal from "react-modal";
import { fetchTeamMembers, getTeamById } from "@/store/team/teamSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { BonadocsEditorTeamsModalInviteMember } from "./BonadocsEditorTeamsModalInviteMember";

interface TeamInfo {
  name: string;
  id?: string;
}
interface BonadocsEditorTeamsModalInviteProps {
  className?: string;
  show?: boolean;
  closeInviteModal: () => void;
  teamInfo: TeamInfo;
}

export const BonadocsEditorTeamsModalInvite: React.FC<
  BonadocsEditorTeamsModalInviteProps
> = ({ className, show, closeInviteModal, teamInfo }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [addMember, setAddMember] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    setInviteEmail("");
    closeInviteModal();
  };

  const fetchMembers = async () => {
    const members = await dispatch(getTeamById(teamInfo.id!));
    if (members.payload) {
      setTeamMembers(members.payload["users"]);
    }
  };

  useEffect(() => {
    show && fetchMembers();
  }, [show]);

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
        <h3 className="modal__container__title">Team {teamInfo.name}</h3>
        <h5 className="modal__container__text">Members List</h5>
        <div className="bonadocs__editor__projects__action__select ">
          <div className="bonadocs__editor__projects__action__select__inner">
            <div className="bonadocs__editor__projects__action__select__inner__network">
              {teamMembers?.length === 0 && (
                <h4 className="bonadocs__editor__projects__action__select__inner__network__placeholder">
                  There is just you on this team.
                </h4>
              )}
              {teamMembers?.map((member, index) => (
                <div
                  key={index}
                  className="bonadocs__editor__projects__action__select__inner__network__item"
                >
                  <div className="bonadocs__editor__projects__action__select__inner__network__item__name">
                    {member.firstName} {member.lastName}
                  </div>
                  <img
                    onClick={() => {
                      // const members = teamMembers.slice();
                      // members.splice(index, 1);
                      // setTeamMembers(members);
                    }}
                    alt="delete instance"
                    src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1701455363/close_isqdse.svg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {!addMember && (
          <div
            className="bonadocs__editor__projects__creation__add"
            onClick={() => setAddMember(!addMember)}
          >
            <svg
              className="bonadocs__editor__dashboard__playground__contract__header__addIconn bonadocs__editor__projects__creation__add__icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8L12 8"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M8 12L8 4"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <h3 className="bonadocs__editor__projects__creation__add__title">
              Add user
            </h3>
          </div>
        )}

        {addMember && (
          <BonadocsEditorTeamsModalInviteMember
            addMember={addMember}
            setAddMember={setAddMember}
            projectId={teamInfo.id!}
          />
        )}
      </div>
    </Modal>
  );
};
