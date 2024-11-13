import React, { useState } from "react";
import { TeamMembersTable, teamRoles } from "@/data/team/TeamRoles";
import _ from "lodash";
import { BonadocsEditorTeamsModalInvite } from "../BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalInvite";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface BonadocsEditorProjectsMemberProps {
  teamMembers: any[];
}

const BonadocsEditorProjectsMembers: React.FC<
  BonadocsEditorProjectsMemberProps
> = ({ teamMembers }) => {
  const [inviteModal, setInviteModal] = useState(false);
  const userRole = (user: any) =>
    teamRoles.find((role) => _.isEqual(role.permission, user.permissions));
  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  return (
    <>
      <div className="flex">
        <h2>MEMBERS</h2>
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
      </div>
      <div className="bonadocs__editor__projects__members">
        {TeamMembersTable.map((item, index) => (
          <div key={index} className="bonadocs__editor__projects__members__item">
            {item.name}
          </div>
        ))}
      </div>

      {teamMembers.map((member, index) => (
        <div key={index} className="bonadocs__editor__projects__members">
          <div className="bonadocs__editor__projects__members__details white">{`${member.firstName} ${member.lastName}`}</div>
          <div className="bonadocs__editor__projects__members__details">{` ${member.username}`}</div>
          <div className="bonadocs__editor__projects__members__details">
            {userRole(member)?.label}
          </div>
        </div>
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
