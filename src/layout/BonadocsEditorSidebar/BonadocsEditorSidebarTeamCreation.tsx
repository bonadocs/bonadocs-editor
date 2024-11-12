import React, { useState } from "react";
import { BonadocsEditorTeamsModalCreate } from "../BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalCreate";
import { useNavigate } from "react-router-dom";


interface BonadocsEditorSidebarTeamCreationProps {
  teams: boolean;
}

export const BonadocsEditorSidebarTeamCreation: React.FC<
  BonadocsEditorSidebarTeamCreationProps
> = ({ teams }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  return (
    <>
      <div className="bonadocs__editor__sidebar__info">
        <h2>{teams ? `TEAMS` : `PROJECTS`}</h2>
        <div className="flex">
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
            onClick={() => setShow(!show)}
            className="bonadocs__editor__projects__creation__add__title"
          >
            Create Team
          </h3>
        </div>
      </div>
      <BonadocsEditorTeamsModalCreate
              show={show}
              teamsPage={teams}
        closeCreateModal={(id) => {
          setShow(!show);

          navigate({
            pathname: `/teams/${id}/projects`,
          });
        }}
      />
    </>
  );
};
