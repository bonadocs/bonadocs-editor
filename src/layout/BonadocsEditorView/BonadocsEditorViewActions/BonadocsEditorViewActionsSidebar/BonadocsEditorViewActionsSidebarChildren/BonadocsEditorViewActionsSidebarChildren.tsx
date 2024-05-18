import React, { useState, useEffect } from "react";
import { BonadocsEditorViewActionsSidebarChildrenItem } from "./BonadocsEditorViewActionsSidebarChildrenItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store/index";
import { getCollectionActions } from "@/store/action/actionSlice";
import { useCollectionContext } from "@/context/CollectionContext";

export const BonadocsEditorViewActionsSidebarChildren: React.FC = () => {
  const { getCollection } = useCollectionContext();
  const actionItems = useSelector(
    (state: RootState) => state.action.collectionActions
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCollectionActions(getCollection()!));
  }, []);

  return (
    <div className="bonadocs__editor__dashboard__playground__action__list__children">
      {actionItems.map((action) => (
        <BonadocsEditorViewActionsSidebarChildrenItem
          name={action.name}
          id={action.id}
          key={action.id}
        />
      ))}
    </div>
  );
};
