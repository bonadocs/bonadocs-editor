import React, { useState } from "react";
import { Logo } from "@/components/logo/Logo";
import { BonadocsEditorSidebarItems } from "./BonadocsEditorSidebarItems";
import { BonadocsEditorSidebarOptions } from "./BonadocsEditorSidebarOptions";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
interface SidebarProps {
  className: string;
}
export const BonadocsEditorSidebar: React.FC<SidebarProps> = ({
  className,
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const warningBar = useSelector(
    (state: RootState) => state.controlBoard.warningBar
  );

  const warningText = `New updates available! Refresh to get the latest or cancel to continue with the current view.`;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={className}>
      {warningBar && (
        <div className="bonadocs__editor__sidebar__info">
          <div className="bonadocs__editor__sidebar__info__text">
            {warningText}
            <span
              className="bonadocs__editor__sidebar__info__text__cta"
              onClick={() => {
                dispatch({
                  type: "controlBoard/setWarningBar",
                  payload: !open,
                });
                window.location.reload();
              }}
            >
              Refresh
            </span>
          </div>
          <img
            src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1728732446/Close_aqavst.svg"
            alt="profile"
            onClick={() => {
              setOpen(!open);
              dispatch({ type: "controlBoard/setWarningBar", payload: !open });
              // dispatch(setMethodItem({} as MethodItem));
              // dispatch(setMethodDisplayData([]));
              // dispatch(setActiveContract({} as ContractItem));
            }}
          />
        </div>
      )}
      <Logo className="bonadocs__editor__sidebar__logo" />
      <BonadocsEditorSidebarItems />
      <BonadocsEditorSidebarOptions />
    </div>
  );
};
