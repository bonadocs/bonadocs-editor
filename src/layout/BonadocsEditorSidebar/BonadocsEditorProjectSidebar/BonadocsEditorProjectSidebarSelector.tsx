import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

export const BonadocsEditorProjectSidebarSelector: React.FC = () => {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });
  const navigate = useNavigate();
  const teams = useSelector((state: RootState) => state.team.teamList);
  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className="wid-100">
        <div className="bonadocs__editor__sidebar__selector">
          <h3>
            Team :
            <span className="bonadocs__editor__sidebar__selector__team__name">
              {" "}
              {currentTeam.name}{" "}
            </span>
          </h3>
          <svg
            className={`bonadocs__accordion__parent__icon bona__transition bonadocs__editor__sidebar__selector__team__dropdown`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645L11.0205 7.64645C11.1143 7.74021 11.167 7.86739 11.167 8C11.167 8.13261 11.1143 8.25979 11.0205 8.35355L7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536C6.11818 12.1583 6.11818 11.8417 6.31344 11.6464L9.95989 8L6.31344 4.35355C6.11818 4.15829 6.11818 3.84171 6.31344 3.64645Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="bonadocs__editor__param__item__popover bor-main"
      >
        {({ close }) => (
          <>
            {teams.map((team, index) => (
              <div
                onClick={() => {
                  navigate({
                    pathname: `/teams/${team.id}/projects`,
                  });
                  close();
                }}
                key={index}
                className="bonadocs__editor__param__item__teams"
              >
                <h3>{team.name}</h3>
              </div>
            ))}
          </>
        )}
      </Popover.Panel>
    </Popover>
  );
};
