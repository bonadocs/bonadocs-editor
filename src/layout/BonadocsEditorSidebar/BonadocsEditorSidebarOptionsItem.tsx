import React from "react";

interface BonadocsEditorSidebarOptionsItemProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
  link?: string;
}
export const BonadocsEditorSidebarOptionsItem: React.FC<
  BonadocsEditorSidebarOptionsItemProps
> = ({ icon, name, className, link }) => {
  // Component logic goes here
  return (
    <div
      onClick={() => {
        if (link) window.open(link, "_blank");
      }}
      className={className}
    >
      <div>{icon}</div>
      <div>{name}</div>
    </div>
  );
};
