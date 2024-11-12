import React, { useState } from "react";
import { Logo } from "@/components/logo/Logo";
import { BonadocsEditorTeamSidebarItems } from "./BonadocsEditorTeamSidebarItems";
import { BonadocsEditorTeamSidebarOptions } from "./BonadocsEditorTeamSidebarOptions";
import { ReactComponent as CodePlaceholder } from "@/assets/SidebarIcons/codePlaceholder.svg";
import { BonadocsEditorTeamsModalCreate } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalCreate";
import { BonadocsEditorSidebarTeamCreation } from "../BonadocsEditorSidebarTeamCreation";
interface SidebarProps {
  className: string;
}
export const BonadocsEditorSidebarTeam: React.FC<SidebarProps> = ({
  className,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <Logo className="bonadocs__editor__sidebar__logo" />
      <BonadocsEditorTeamSidebarItems />
      <div className="demarcation"></div>
      <BonadocsEditorSidebarTeamCreation teams />
      <div className="bonadocs__editor__sidebar__info__code">
        {<CodePlaceholder />}
        <h3 className="bonadocs__editor__sidebar__info__code__title">
          Your teams are shown here
        </h3>
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
            Create a new team
          </h3>
        </div>
      </div>
      <BonadocsEditorTeamSidebarOptions />
      <BonadocsEditorTeamsModalCreate
        show={show}
        closeCreateModal={() => setShow(!show)}
      />
    </div>
  );
};
