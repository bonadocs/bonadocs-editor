import { teamRoles } from "@/data/team/TeamRoles";
import { Button } from "@/components/button/Button";
import { SelectInput } from "@/components/input/SelectInput";
import { TextInput } from "@/components/input/TextInput";
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { inviteMember } from "@/store/team/teamSlice";
import { toast } from "react-toastify";

interface BonadocsEditorTeamsModalInviteMemberProps {
  addMember: boolean;
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}

export const BonadocsEditorTeamsModalInviteMember: React.FC<
  BonadocsEditorTeamsModalInviteMemberProps
> = ({ setAddMember, addMember, projectId }) => {
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const sendInvite = async () => {
    if (userValidation) {
      // dispatch invite member
      setLoading(true);

      const permission = teamRoles.find((role) => role.value === userRole);
      console.log(inviteEmail, userRole, permission, userName);
      const invite = await dispatch(
        inviteMember({
          projectId,
          name: userName,
          email: inviteEmail,
          permission: permission?.permission!,
        })
      );
      console.log(invite);

      if (invite.payload) {
        setLoading(false);
        setAddMember(!addMember);
      } else setLoading(false);
    } else toast.error("Please fill all fields");
  };

  const userValidation = inviteEmail && userRole && userName ? true : false;

  return (
    <>
      <div className="modal__container__wrapper__inner">
        <h5 className="modal__container__title ma-top">Invite new member</h5>
        <h5 className="modal__container__text">Name</h5>
        <TextInput
          value={userName}
          handleChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="Enter the user's name"
          className="modal__container__wrapper__inner__input"
        />
        <h5 className="modal__container__text">Email</h5>
        <TextInput
          value={inviteEmail}
          handleChange={(e) => {
            setInviteEmail(e.target.value);
          }}
          placeholder="Enter the user's email"
          className="modal__container__wrapper__inner__input"
        />
        <h5 className="modal__container__text">Role</h5>
        <SelectInput
          handleInputChange={(item) => {
            console.log(item.target.value);

            setUserRole(item.target.value);
          }}
          className="pa-1"
          // className="modal__container__wrapper__inner__button"
          placeholder="Select role"
          options={teamRoles}
        />
      </div>
      <div className="bonadocs__editor__projects__creation__selection__item__deets__wrapper">
        <Button
          type="action"
          onClick={() => sendInvite()}
          disabled={!userValidation}
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
              "Invite member"
            )}
          </>
        </Button>
        <Button
          onClick={() => {
            setAddMember(!addMember);
          }}
          className="bonadocs__editor__projects__creation__selection__item__deets__delete"
          type="critical"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
