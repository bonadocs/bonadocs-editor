import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

interface BonadocsEditorSidebarItemProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
  route: string;
}

export const BonadocsEditorSidebarItem: React.FC<
  BonadocsEditorSidebarItemProps
> = ({ icon, name, className, route }) => {
  const { pathname } = useLocation();

  const active =
    route === pathname
      ? "bona__active"
      : "" || (route === "/contracts" && pathname === "/" && "bona__active");
  const [queryParameters] = useSearchParams();
  const uri = queryParameters.get("uri");
  const id = queryParameters.get("id");
  return (
    <Link to={`${route}?uri=${uri}&id=${id ?? ""}`}>
      <li className={`bonadocs__editor__sidebar__item ${active} ${className}`}>
        {icon && <div>{icon}</div>}
        <div>{name}</div>
      </li>
    </Link>
  );
};
