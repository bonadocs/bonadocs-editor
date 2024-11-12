import React from "react";
import { SidebarProjectItems } from "@/data/sidebar/SidebarItems";
import { BonadocsEditorProjectSidebarItem } from "./BonadocsEditorProjectSidebarItem";

export const BonadocsEditorProjectSidebarItems: React.FC = () => {
  // Component logic goes here

  return (
    <ul>
      {SidebarProjectItems.map(({ name, icon, route }, index) => (
        <BonadocsEditorProjectSidebarItem
          route={route}
          key={index}
          name={name}
          icon={icon}
        />
      ))}
    </ul>
  );
};
