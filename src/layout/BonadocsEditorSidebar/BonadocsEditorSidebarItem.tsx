import React from "react";

interface BonadocsEditorSidebarItemProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
}

export const BonadocsEditorSidebarItem: React.FC<
  BonadocsEditorSidebarItemProps
> = ({ icon, name }) => {
  return (
    <li className="bonadocs__editor__sidebar__item">
      {icon && <div>{icon}</div>}
      <div>{name}</div>
    </li>
  );
};
