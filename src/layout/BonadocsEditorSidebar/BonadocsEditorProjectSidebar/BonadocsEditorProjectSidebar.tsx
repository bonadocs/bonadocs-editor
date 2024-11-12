import React, { useState } from "react";
import { Logo } from "@/components/logo/Logo";
import { BonadocsEditorProjectSidebarItems } from "./BonadocsEditorProjectSidebarItems";
import { BonadocsEditorTeamSidebarOptions } from "../BonadocsEditorTeamSidebar/BonadocsEditorTeamSidebarOptions";
import { BonadocsEditorTeamsModalCreate } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalCreate";
import { BonadocsEditorSidebarTeamCreation } from "../BonadocsEditorSidebarTeamCreation";
import { BonadocsEditorProjectSidebarSelector } from "./BonadocsEditorProjectSidebarSelector";
interface SidebarProps {
  className?: string;
}
export const BonadocsEditorProjectSidebar: React.FC<SidebarProps> = ({
  className,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <Logo className="bonadocs__editor__sidebar__logo" />
      <BonadocsEditorSidebarTeamCreation teams={false} />
      <BonadocsEditorProjectSidebarSelector/>

      <BonadocsEditorProjectSidebarItems />
      <BonadocsEditorTeamSidebarOptions />
      <BonadocsEditorTeamsModalCreate
        show={show}
        closeCreateModal={() => setShow(!show)}
      />
    </div>
  );
};
