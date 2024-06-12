import React, { useEffect } from "react";
import { BonadocsEditorViewActionsSidebarHeader } from "./BonadocsEditorViewActionsSidebarHeader";
import { BonadocsEditorViewActionsSidebarChildren } from "./BonadocsEditorViewActionsSidebarChildren/BonadocsEditorViewActionsSidebarChildren";
import { BonadocsEditorViewsActionsPackagesSidebarChildren } from "../BonadocsEditorViewActionsPackagesSidebar/BonadocsEditorViewsActionsPackagesSidebarChildren/BonadocsEditorViewsActionsPackagesSidebarChildren";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { getLatestEthersVersion } from "@/store/package/packageSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { BonadocsEditorViewActionsPackagesSidebarHeader } from "../BonadocsEditorViewActionsPackagesSidebar/BonadocsEditorViewActionsPackagesSidebarHeader";

export const BonadocsEditorViewActionsSidebar: React.FC = () => {
  const { getCollection } = useCollectionContext();
  const packagesView = useSelector(
    (state: RootState) => state.controlBoard.packagesView
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getLatestEthersVersion(getCollection()!));
    };

    fetchData();
  }, []);
  return (
    <div className="bonadocs__editor__dashboard__playground__action__list">
      {!packagesView ? (
        <>
          <BonadocsEditorViewActionsSidebarHeader />
          <BonadocsEditorViewActionsSidebarChildren />
        </>
      ) : (
        <>
          <BonadocsEditorViewActionsPackagesSidebarHeader />
          <BonadocsEditorViewsActionsPackagesSidebarChildren />
        </>
      )}
    </div>
  );
};
