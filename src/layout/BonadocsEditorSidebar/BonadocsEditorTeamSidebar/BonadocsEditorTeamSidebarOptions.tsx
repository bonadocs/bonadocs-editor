import React from "react";
import { SidebarOptions } from "@/data/sidebar/SidebarItems";
import { BonadocsEditorSidebarOptionsItem } from "../BonadocsEditorSidebarOptionsItem";


export const BonadocsEditorTeamSidebarOptions: React.FC = () => {
  const {name, icon, link} = SidebarOptions[1];
  return (
    <div className="bonadocs__editor__sidebar__options">

  
        <BonadocsEditorSidebarOptionsItem
          key={0}
          name={name}
          icon={icon}
          link={link ?? ""}
          className="bonadocs__editor__sidebar__item"
        />
      
    </div>
  );
};
