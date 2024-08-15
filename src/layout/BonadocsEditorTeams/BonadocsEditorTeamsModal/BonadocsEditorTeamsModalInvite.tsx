import React, { useEffect, useState } from "react";
import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/input/TextInput";
import { customStyles } from "@/data/toast/toastConfig";
import Modal from "react-modal";
import { MoonLoader } from "react-spinners";
import { teamCreation } from "@/store/team/teamSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

interface BonadocsEditorTeamsModalInviteProps {
  className?: string;
  show?: boolean;
  closeInviteModal: () => void;
  teamName: string;
}

export const BonadocsEditorTeamsModalInvite: React.FC<
  BonadocsEditorTeamsModalInviteProps
> = ({ className, show, closeInviteModal, teamName }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [addEmail, setAddEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    setInviteEmail("");
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
        <h3 className="modal__container__title">Team {teamName}</h3>
        <h5 className="modal__container__text">Members</h5>
        <div className="bonadocs__editor__projects__action__select ">
          <div className="bonadocs__editor__projects__action__select__inner">
            <div className="bonadocs__editor__projects__action__select__inner__network">
              {/* {contractInstances && contractInstances?.length < 1 && (
                <h4 className="bonadocs__editor__projects__action__select__inner__network__placeholder">
                  Click "+" icon to add team member
                </h4>
              )}
              {contractInstances?.map((instance, index) => (
                <div
                  key={index}
                  className="bonadocs__editor__projects__action__select__inner__network__element"
                >
                  <img
                    className="bonadocs__editor__projects__action__select__inner__network__element__image"
                    src={instance.logo}
                    alt="network logo"
                  />
                  <div className="bonadocs__editor__projects__action__select__inner__network__element__name">
                    {instance.name}
                  </div>
                  <img
                    className="bonadocs__editor__projects__action__select__inner__network__element__delete"
                    src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1701455363/close_isqdse.svg"
                    alt="network logo"
                    onClick={() => {
                     
                    }}
                  />
                </div>
              ))} */}
            </div>

            <svg
              onClick={() => setAddEmail(!addEmail)}
              className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8L12 8"
                stroke="#95A8C0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12L8 4"
                stroke="#95A8C0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* {!addEmail && (
          <div
            className="bonadocs__editor__projects__creation__add"
            onClick={() => setAddEmail(!addEmail)}
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
        )} */}

        {addEmail && (
          <>
            <div className="modal__container__wrapper__inner">
              <h5 className="modal__container__text">Invite new member</h5>
              <TextInput
                value={inviteEmail}
                handleChange={(e) => {
                  setInviteEmail(e.target.value);
                }}
                placeholder="Enter the user's email"
                className="modal__container__wrapper__inner__input"
              />
              <Button
                type="action"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const creation = await dispatch(teamCreation(teamName));
                    if (creation.payload === false) {
                      setLoading(false);
                      return;
                    }
                    setLoading(false);
                    closeInviteModal();
                  } catch (err) {
                    setLoading(false);
                  }
                }}
                className="modal__container__wrapper__inner__button"
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
                    "Invite user"
                  )}
                </>
              </Button>
            </div>

            <Button
              onClick={() => setAddEmail(!addEmail)}
              className="bonadocs__editor__projects__creation__selection__item__deets__delete"
              type="critical"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
