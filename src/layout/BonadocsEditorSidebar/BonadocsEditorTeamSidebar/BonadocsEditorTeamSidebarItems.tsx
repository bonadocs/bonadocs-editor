import React from "react";
import { SidebarTeamItems } from "@/data/sidebar/SidebarItems";
import { BonadocsEditorTeamSidebarItem } from "./BonadocsEditorTeamSidebarItem";

export const BonadocsEditorTeamSidebarItems: React.FC = () => {
  // Component logic goes here

  return (
    <ul>
      {SidebarTeamItems.map(({ name, icon, route }, index) => (
        <BonadocsEditorTeamSidebarItem
          route={route}
          key={index}
          name={name}
          icon={icon}
        />
      ))}
    </ul>
  );
};
