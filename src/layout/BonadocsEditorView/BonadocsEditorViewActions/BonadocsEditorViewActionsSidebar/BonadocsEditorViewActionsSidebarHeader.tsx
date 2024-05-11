import React from "react";

interface BonadocsEditorViewActionsSidebarHeaderProps {
  // Add any props you need here
}

export const BonadocsEditorViewActionsSidebarHeader: React.FC<
  BonadocsEditorViewActionsSidebarHeaderProps
> = () => {
  // Add your component logic here

  return (
    <div className="bonadocs__editor__dashboard__playground__action__list__header">
      <h3
        // ref={ref}
        className={`bonadocs__editor__dashboard__playground__contract__header__title`}
      >
        Actions
      </h3>
      <svg
        className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 8L12 8"
          stroke="#95A8C0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12L8 4"
          stroke="#95A8C0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
