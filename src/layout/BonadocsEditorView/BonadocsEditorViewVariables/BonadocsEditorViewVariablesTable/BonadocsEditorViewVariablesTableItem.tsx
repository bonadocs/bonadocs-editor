import React, { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { BonadocsVariableEditModal } from "../BonadocsVariablesModal/BonadocsVariableEditModal";
import { BonadocsVariableDeleteModal } from "../BonadocsVariablesModal/BonadocsVariableDeleteModal";
export const BonadocsEditorViewVariablesTableItem: React.FC = () => {
  const [editWidget, setEditWidget] = useState<boolean>(false);
  const [deleteWidget, setDeleteWidget] = useState<boolean>(false);
  return (
    <div className="bonadocs__editor__variables__table__item">
      <h3>Name</h3>
      <h3 className="ma-l">Value</h3>
      <Popover className="relative">
        <Popover.Button className="">
          <svg
            width="50"
            height="24"
            viewBox="0 0 50 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 6C25.5523 6 26 5.55228 26 5C26 4.44772 25.5523 4 25 4C24.4477 4 24 4.44772 24 5C24 5.55228 24.4477 6 25 6Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25 13C25.5523 13 26 12.5523 26 12C26 11.4477 25.5523 11 25 11C24.4477 11 24 11.4477 24 12C24 12.5523 24.4477 13 25 13Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25 20C25.5523 20 26 19.5523 26 19C26 18.4477 25.5523 18 25 18C24.4477 18 24 18.4477 24 19C24 19.5523 24.4477 20 25 20Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Popover.Button>
        <Popover.Panel className="bonadocs__editor__variables__table__item__popover">
          <div className="bonadocs__editor__variables__table__item__popover__item">
            <div
              onClick={() => setEditWidget(!editWidget)}
              className="bonadocs__editor__variables__table__item__popover__item__edit"
            >
              Edit Variable
            </div>
            <div
              onClick={() => setDeleteWidget(!deleteWidget)}
              className="bonadocs__editor__variables__table__item__popover__item__delete"
            >
              Delete Variable
            </div>
          </div>

          <img src="/solutions.jpg" alt="" />
        </Popover.Panel>
      </Popover>
      <BonadocsVariableEditModal
        closeEditModal={() => setEditWidget(!editWidget)}
        show={editWidget}
      />
      <BonadocsVariableDeleteModal
        closeDeleteModal={() => setDeleteWidget(!deleteWidget)}
        show={deleteWidget}
      />
    </div>
  );
};
