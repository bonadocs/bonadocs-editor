import React from "react";

interface BonadocsEditorViewPlaygroundResultHeaderProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundResultHeader: React.FC<
  BonadocsEditorViewPlaygroundResultHeaderProps
> = ({ className }) => {
  // Component logic goes here
  return (
    <div
      className={`bonadocs__editor__dashboard__playground__result__header ${className}`}
    >
      <h3 className="bonadocs__editor__dashboard__playground__result__header__title">
        Project Documentation
      </h3>
      <svg
        className="bonadocs__editor__dashboard__playground__result__header__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2L14 2V6"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 14H2L2 10"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.0002 2L9.3335 6.66667"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 14.0007L6.66667 9.33398"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};