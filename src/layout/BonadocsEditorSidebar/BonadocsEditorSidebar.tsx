import React from "react";

interface SidebarProps {
  className: string;
}
export const BonadocsEditorSidebar: React.FC<SidebarProps> = ({
  className,
}) => {
  return <div className={className}></div>;
};
