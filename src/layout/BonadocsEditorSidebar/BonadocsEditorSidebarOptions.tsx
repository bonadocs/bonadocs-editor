import React from "react";
import { SidebarOptions } from "@/data/sidebar/SidebarItems";
import { BonadocsEditorSidebarOptionsItem } from "./BonadocsEditorSidebarOptionsItem";
import { BonadocsEditorSidebarSimulatorItem } from "./BonadocsEditorSidebarSimulatorItem";

export const BonadocsEditorSidebarOptions: React.FC = () => {
  // Component logic goes here
  return (
    <div className="bonadocs__editor__sidebar__options">
      <BonadocsEditorSidebarSimulatorItem className="bonadocs__editor__sidebar__simulation" />

      {SidebarOptions.map(({ name, icon }, index) => (
        <BonadocsEditorSidebarOptionsItem
          key={index}
          name={name}
          icon={icon}
          className="bonadocs__editor__sidebar__item"
        />
      ))}
    </div>
  );
};
