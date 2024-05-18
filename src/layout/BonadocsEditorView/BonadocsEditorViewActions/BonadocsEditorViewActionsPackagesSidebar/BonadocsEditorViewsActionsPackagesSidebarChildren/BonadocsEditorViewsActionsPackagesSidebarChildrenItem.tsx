import React, { useState } from "react";
import { Tab } from "@/components/tab/Tab";

interface BonadocsEditorViewsActionsPackagesSidebarChildrenItemProps {
  name: string;
  id?: string;
}

export const BonadocsEditorViewsActionsPackagesSidebarChildrenItem: React.FC<
  BonadocsEditorViewsActionsPackagesSidebarChildrenItemProps
> = ({ name, id }) => {


  return (
    <div
      className={`bonadocs__editor__dashboard__playground__package__list__children__item`}
    >
      {name}
      <Tab
        className="bonadocs__editor__dashboard__playground__package__list__children__item__tab"
        type="package"
        color="neutral"
        children="JS"
      />
      <Tab
        className="bonadocs__editor__dashboard__playground__package__list__children__item__tab"
        type="package"
        color="yellow"
        children="ESM"
      />
      <Tab
        className="bonadocs__editor__dashboard__playground__package__list__children__item__tab"
        type="package"
        color="blue"
        children="CJS"
      />
      <>
        <svg
        //   onClick={() => setOpenDeleteModal(!openDeleteModal)}
          className="bonadocs__editor__dashboard__playground__package__list__children__item__img"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.66666 3.31331L5.81332 2.43998C5.91999 1.80665 5.99999 1.33331 7.12666 1.33331H8.87332C9.99999 1.33331 10.0867 1.83331 10.1867 2.44665L10.3333 3.31331"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.5667 6.09332L12.1334 12.8067C12.06 13.8533 12 14.6667 10.14 14.6667H5.86002C4.00002 14.6667 3.94002 13.8533 3.86668 12.8067L3.43335 6.09332"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.88669 11H9.10669"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.33334 8.33331H9.66668"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>

      {/* <BonadocsEditorViewActionsModalDelete
          show={openDeleteModal}
          closeDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
          actionItem={collectionActions.find((action) => action.id === id)!}
        />  */}
      
    </div>
  );
};
