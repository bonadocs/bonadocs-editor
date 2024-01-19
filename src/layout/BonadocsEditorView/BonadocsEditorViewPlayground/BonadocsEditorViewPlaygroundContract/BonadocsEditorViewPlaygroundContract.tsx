import React from "react";
import { BonadocsEditorViewPlaygroundContractAccordion } from "./BonadocsEditorViewPlaygroundContractAccordion";

interface BonadocsEditorViewPlaygroundContractProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundContract: React.FC<
  BonadocsEditorViewPlaygroundContractProps
> = ({ className }) => {
  return (
    <div className={className}>
      <div className="bonadocs__editor__dashboard__playground__contract__header">
        <h3 className="bonadocs__editor__dashboard__playground__contract__header__title">
          fiatTokenV2
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
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 12L8 4"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="bonadocs__editor__dashboard__playground__contract__type">
        <div className="bonadocs__editor__dashboard__playground__contract__type__container">
          <div className="bonadocs__editor__dashboard__playground__contract__type__container__item bona__bg">
            Read
          </div>
          <div className="bonadocs__editor__dashboard__playground__contract__type__container__item">
            Write
          </div>
        </div>
      </div>
      <div className="bonadocs__editor__dashboard__playground__contract__list">
        <BonadocsEditorViewPlaygroundContractAccordion />
      </div>
    </div>
  );
};
