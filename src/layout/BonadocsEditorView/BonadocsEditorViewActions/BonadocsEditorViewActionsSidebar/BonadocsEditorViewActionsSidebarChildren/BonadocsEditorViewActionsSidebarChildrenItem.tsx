import React from "react";
import { ReactComponent as ActionIcon } from "@/assets/SidebarIcons/action.svg";
import { setActiveAction } from "@/store/action/actionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface BonadocsEditorViewActionsSidebarChildrenItemProps {
  name: string;
}

export const BonadocsEditorViewActionsSidebarChildrenItem: React.FC<
  BonadocsEditorViewActionsSidebarChildrenItemProps
> = ({ name }) => {
  const dispatch = useDispatch<AppDispatch>();
  const setCurrentAction = () => {
    dispatch(setActiveAction({ name }));
  };

  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );

  return (
    <div
      onClick={setCurrentAction}
      className={`bonadocs__editor__dashboard__playground__action__list__children__item ${
        name === currentAction.name &&
        `bonadocs__editor__dashboard__playground__action__list__children__item__active`
      }`}
    >
      {React.createElement(ActionIcon)}
      {name}
    </div>
  );
};
