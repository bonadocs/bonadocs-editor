import React from "react";
import { Logo } from "@/components/logo/Logo";
import { BonadocsEditorSidebarItems } from "./BonadocsEditorSidebarItems";
import { BonadocsEditorSidebarOptions } from "./BonadocsEditorSidebarOptions";
interface SidebarProps {
  className: string;
}
export const BonadocsEditorSidebar: React.FC<SidebarProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <Logo className="bonadocs__editor__sidebar__logo"/>
      <BonadocsEditorSidebarItems />
      <BonadocsEditorSidebarOptions />
    </div>
  );
};
