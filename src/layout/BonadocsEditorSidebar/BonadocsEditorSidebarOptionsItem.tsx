import React, { useState } from "react";
import { setPackagesView } from "@/store/controlBoard/controlBoardSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store";

interface BonadocsEditorSidebarOptionsItemProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
  link?: string;
}
export const BonadocsEditorSidebarOptionsItem: React.FC<
  BonadocsEditorSidebarOptionsItemProps
> = ({ icon, name, className, link }) => {
  const dispatch: AppDispatch = useDispatch();
  const packagesView = useSelector(
    (state: RootState) => state.controlBoard.packagesView
  );

  return (
    <div
      onClick={() => {
        if (link) window.open(link, "_blank");
        if (name === "Packages") {
          dispatch(setPackagesView(!packagesView));
        }
      }}
      className={`${className} ${
        name === "Packages" && packagesView === true && "bona__active"
      }`}
    >
      <div>{icon}</div>
      <div>{name}</div>
    </div>
  );
};
