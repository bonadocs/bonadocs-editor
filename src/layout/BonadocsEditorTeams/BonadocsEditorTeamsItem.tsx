import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import { TeamItem } from "@/data/dataTypes";
import { BonadocsEditorTeamsModalInvite } from "./BonadocsEditorTeamsModal/BonadocsEditorTeamsModalInvite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteTeam, setTeamId } from "@/store/team/teamSlice";

interface BonadocsEditorTeamsItemProps {
  teamItem: TeamItem;
}

export const BonadocsEditorTeamsItem: React.FC<
  BonadocsEditorTeamsItemProps
> = ({ teamItem }) => {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });
  const [inviteModal, setInviteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bonadocs__editor__projects__inner__list__item">
      <img
        className="bonadocs__editor__projects__inner__list__item__icon"
        src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715442416/code-circle_zzekez.svg"
      />
      <div
        onClick={() => {
          // dispatch(setTeamId(teamItem.id));
          navigate({
            pathname: `/teams/${teamItem.id}/projects`,
          });
        }}
        className="bonadocs__editor__projects__inner__list__item__info"
      >
        <h3 className="bonadocs__editor__projects__inner__list__item__info__title">
          {teamItem.name}
        </h3>
        <h5 className="bonadocs__editor__projects__inner__list__item__info__description">
          {teamItem.slug}
        </h5>
      </div>
      <Popover className="relative ma-auto">
        <Popover.Button
          className="bonadocs__editor__projects__inner__list__item__icon"
          ref={setReferenceElement}
        >
          <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715454229/More_aiemyt.svg" />
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="bonadocs__editor__variables__table__item__popover"
        >
          {({ close }) => (
            <>
              <div className="bonadocs__editor__variables__table__item__popover__item">
                <div
                  onClick={() => {
                    setInviteModal(!inviteModal);
                  }}
                  className="bonadocs__editor__variables__table__item__popover__item__edit"
                >
                  Team members
                </div>
                <div
                  onClick={() => {
                    // setDeleteWidget(!deleteWidget);
                    dispatch(deleteTeam(teamItem.id));
                    close();
                  }}
                  className="bonadocs__editor__variables__table__item__popover__item__delete"
                >
                  Delete Team
                </div>
              </div>

              <img src="/solutions.jpg" alt="" />
            </>
          )}
        </Popover.Panel>
      </Popover>
      <BonadocsEditorTeamsModalInvite
        show={inviteModal}
        closeInviteModal={() => setInviteModal(!inviteModal)}
        teamInfo={teamItem}
      />
    </div>
  );
};
