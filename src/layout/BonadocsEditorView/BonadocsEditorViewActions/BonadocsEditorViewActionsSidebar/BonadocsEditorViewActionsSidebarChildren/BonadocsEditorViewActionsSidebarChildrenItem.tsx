import React, { useState } from "react";
import { ReactComponent as ActionIcon } from "@/assets/SidebarIcons/action.svg";
import { setActiveAction } from "@/store/action/actionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ReactComponent as EditIcon } from "@/assets/action/edit.svg";
import { BonadocsEditorViewActionsModalEdit } from "../../BonadocsEditorViewActionsModal/BonadocsEditorViewActionsModalEdit";
import { BonadocsEditorViewActionsModalDelete } from "../../BonadocsEditorViewActionsModal/BonadocsEditorViewActionsModalDelete";
interface BonadocsEditorViewActionsSidebarChildrenItemProps {
  name: string;
  id: string;
}

export const BonadocsEditorViewActionsSidebarChildrenItem: React.FC<
  BonadocsEditorViewActionsSidebarChildrenItemProps
> = ({ name, id }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const setCurrentAction = () => {
    collectionActions.map((action) => {
      if (action.id === id) {
        dispatch(setActiveAction(action));
        
      }
    });
  };

  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );

  const collectionActions = useSelector(
    (state: RootState) => state.action.collectionActions
  );

  return (
    <div
      onClick={setCurrentAction}
      className={`bonadocs__editor__dashboard__playground__action__list__children__item ${
        id === currentAction.id &&
        `bonadocs__editor__dashboard__playground__action__list__children__item__active`
      }`}
    >
      {React.createElement(ActionIcon)}
      {name}
      {id === currentAction.id && (
        <>
          <EditIcon
            width="19"
            height="19"
            onClick={() => setOpenModal(!openModal)}
            className="bonadocs__editor__dashboard__playground__package__list__children__item__img"
          />
          <svg
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3.98763C11.78 3.76763 9.54667 3.6543 7.32 3.6543C6 3.6543 4.68 3.72096 3.36 3.8543L2 3.98763"
              stroke="#B50037"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.66699 3.31398L5.81366 2.44065C5.92033 1.80732 6.00033 1.33398 7.12699 1.33398H8.87366C10.0003 1.33398 10.087 1.83398 10.187 2.44732L10.3337 3.31398"
              stroke="#B50037"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5669 6.09375L12.1336 12.8071C12.0603 13.8537 12.0003 14.6671 10.1403 14.6671H5.86026C4.00026 14.6671 3.94026 13.8537 3.86693 12.8071L3.43359 6.09375"
              stroke="#B50037"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.88672 11H9.10672"
              stroke="#B50037"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.33301 8.33398H9.66634"
              stroke="#B50037"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}

      <BonadocsEditorViewActionsModalEdit
        show={openModal}
        closeEditModal={() => setOpenModal(!openModal)}
        actionItem={collectionActions.find((action) => action.id === id)!}
      />
      <BonadocsEditorViewActionsModalDelete
        show={openDeleteModal}
        closeDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        actionItem={collectionActions.find((action) => action.id === id)!}
      />
    </div>
  );
};
