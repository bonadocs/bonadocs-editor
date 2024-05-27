import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { getLatestEthersVersion } from "@/store/package/packageSlice";
import { Tab } from "@/components/tab/Tab";
import { useCollectionContext } from "@/context/CollectionContext";
import { ReactComponent as EditIcon } from "@/assets/action/edit.svg";
import { BonadocsEditorActionsModalPackageEdit } from "@/layout/BonadocsEditorView/BonadocsEditorViewActions/BonadocsEditorViewActionsModal/BonadocsEditorActionsModalPackage/BonadocsEditorActionsModalPackageEdit/BonadocsEditorActionsModalPackageEdit";
import { get } from "lodash";
interface BonadocsEditorViewsActionsPackagesSidebarChildrenItemProps {
  name: string;
  id?: string;
  version: string;
}

export const BonadocsEditorViewsActionsPackagesSidebarChildrenItem: React.FC<
  BonadocsEditorViewsActionsPackagesSidebarChildrenItemProps
> = ({ name, id, version }) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { getCollection } = useCollectionContext();
  useEffect(() => {
    dispatch(getLatestEthersVersion(getCollection()!));
  }, []);
  return (
    <div
      className={`bonadocs__editor__dashboard__playground__package__list__children__item`}
    >
      {name}
      <Tab
        className="bonadocs__editor__dashboard__playground__package__list__children__item__tab"
        type="package"
        color="neutral"
        children={version}
      />

      <EditIcon
        onClick={() => setOpenEditModal(!openEditModal)}
        className="bonadocs__editor__dashboard__playground__package__list__children__item__img"
      />

      <BonadocsEditorActionsModalPackageEdit
        closeEditModal={() => setOpenEditModal(!openEditModal)}
        show={openEditModal}
        selectedValue={version}
      />
    </div>
  );
};
