import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface BonadocsEditorProjectSidebarItemProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
  route: string;
}

export const BonadocsEditorProjectSidebarItem: React.FC<
  BonadocsEditorProjectSidebarItemProps
> = ({ icon, name, className, route }) => {
  const { pathname } = useLocation();
  const location = useLocation();
  const { projectId, id } = useParams();
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const uri = queryParameters.get("uri");
  const chainId = queryParameters.get("id");

  const userRoute = `/teams/${id}${route}`;
  

  const active =
    userRoute === `${userRoute}`
      ? "bona__active"
      : route === "/contracts" && pathname === "/"
      ? "bona__active"
      : "";

  // useEffect(() => {
  //   // Logic to handle changes when id or query params change
  //   console.log("Route or query params changed");
  // }, [id, projectId, location.search]);

  return (
    // <Link to={`${route}?uri=${uri}&id=${chainId ?? ""}`}>
    <li
      onClick={() =>
        navigate({
          pathname: `${userRoute}`,
        })
      }
      className={`bonadocs__editor__sidebar__item ${active} ${className}`}
    >
      {icon && <div>{icon}</div>}
      <div>{name}</div>
    </li>
    // </Link>
  );
};