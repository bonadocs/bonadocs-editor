import React, { useState } from "react";
import { TeamMembersTable, teamRoles } from "@/data/team/TeamRoles";
import { BonadocsEditorTeamsModalInvite } from "../BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalInvite";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ReactComponent as MenuIcon } from "@/assets/project/menu.svg";
import { usePopper } from "react-popper";
import { BonadocsEditorProjectsMembersItem } from "./BonadocsEditorProjectsMembersItem";

interface BonadocsEditorProjectsMemberProps {
  teamMembers: any[];
  updateCurrentTeam: () => void;
}

const BonadocsEditorProjectsMembers: React.FC<
  BonadocsEditorProjectsMemberProps
> = ({ teamMembers, updateCurrentTeam }) => {
  const [inviteModal, setInviteModal] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>();
  const userRole = (user: any) =>
    teamRoles.find((role) => {
      if (role.permission.length !== user.permissions.length) return false;

      // Sort both arrays and compare each element
      const sortedArr1 = [...role.permission].sort();
      const sortedArr2 = [...user.permissions].sort();

      return sortedArr1.every((value, index) => value === sortedArr2[index]);
    });

  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });

  return (
    <>
      <div className="flex">
        <h2>MEMBERS</h2>
        {currentRole &&
          (currentRole.value === "owner" || currentRole.value === "admin") && currentTeam.activeSubscription && (
            <div className="flex ma-auto ma-bottom-sm">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12L8 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3
                onClick={() => {
                  setInviteModal(!inviteModal);
                }}
                className="bonadocs__editor__projects__creation__add__title"
              >
                Add member
              </h3>
            </div>
          )}
      </div>
      <div className="bonadocs__editor__projects__members">
        {TeamMembersTable.map((item, index) => (
          <div
            key={index}
            className="bonadocs__editor__projects__members__item"
          >
            {item.name}
          </div>
        ))}
      </div>

      {teamMembers.map((member, index) => (
        <BonadocsEditorProjectsMembersItem
          key={index}
          firstName={member.firstName}
          lastName={member.lastName}
          email={member.username}
          role={userRole(member)?.label!}
          id={member.id}
          updateMembers={updateCurrentTeam}
          currentUserRole={setCurrentRole}
        />
      ))}
      <BonadocsEditorTeamsModalInvite
        show={inviteModal}
        closeInviteModal={() => setInviteModal(!inviteModal)}
        teamInfo={currentTeam}
      />
    </>
  );
};

export default BonadocsEditorProjectsMembers;
