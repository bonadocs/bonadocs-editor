import React, { useState } from "react";

export const Accordion: React.FC = () => {
  const [open, isOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => isOpen(!open)}
        className="bonadocs__accordion__parent"
      >
        <svg
          className={`bonadocs__accordion__parent__icon ${
            open && "bona__transition"
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645L11.0205 7.64645C11.1143 7.74021 11.167 7.86739 11.167 8C11.167 8.13261 11.1143 8.25979 11.0205 8.35355L7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536C6.11818 12.1583 6.11818 11.8417 6.31344 11.6464L9.95989 8L6.31344 4.35355C6.11818 4.15829 6.11818 3.84171 6.31344 3.64645Z"
            fill="currentColor"
          />
        </svg>
        <h3>fiatTokenV2</h3>
      </div>
      {open && (
        <div className="bonadocs__accordion__children">
          <div className="bonadocs__accordion__children__item">getPool</div>
          <div className="bonadocs__accordion__children__item">owner</div>
          <div className="bonadocs__accordion__children__item">submit</div>
          <div className="bonadocs__accordion__children__item">
            setDisputeHandlerFee
          </div>
        </div>
      )}
    </div>
  );
};
