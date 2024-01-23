import React from "react";
import { SidebarItems } from "@/data/sidebar/SidebarItems";
import { BonadocsEditorSidebarItem } from "./BonadocsEditorSidebarItem";

export const BonadocsEditorSidebarItems: React.FC = () => {
  // Component logic goes here

  return (
    <ul>
      {SidebarItems.map(({ name, icon, route }, index) => (
        <BonadocsEditorSidebarItem
          route={route}
          key={index}
          name={name}
          icon={icon}
        />
      ))}
    </ul>
  );
};
