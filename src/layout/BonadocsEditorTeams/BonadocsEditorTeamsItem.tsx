import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import { TeamItem } from "@/data/dataTypes";
import { BonadocsEditorTeamsModalInvite } from "./BonadocsEditorTeamsModal/BonadocsEditorTeamsModalInvite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteTeam, getTeamById } from "@/store/team/teamSlice";
import { ReactComponent as TeamIcon } from "@/assets/SidebarIcons/team.svg";
import { fetchCollections } from "@/store/project/projectSlice";
import { set } from "lodash";
import { BonadocsEditorTeamsModalDelete } from "./BonadocsEditorTeamsModal/BonadocsEditorTeamsModalDelete";

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
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [projectNumber, setProjectNumber] = useState<number>(0);

  const fetchMembers = async () => {
    const members = await dispatch(getTeamById(teamItem.id!));
    if (members.payload) {
      setTeamMembers(members.payload["users"]);
    }
  };

  const currentProject = async () => {
    const projects = await dispatch(fetchCollections(teamItem.id!));

    if (!projects.payload) {
      return;
    }

    setProjectNumber(projects.payload.length);
  };

  useEffect(() => {
    fetchMembers();
    currentProject();
  }, []);

  return (
    <>
      <div
        className="bonadocs__editor__projects__inner__list__item"
        onClick={() => {
          // dispatch(setTeamId(teamItem.id));
          navigate({
            pathname: `/teams/${teamItem.id}/projects`,
          });
        }}
      >
        <div className="bonadocs__editor__projects__inner__list__item__header">
          <img
            className="bonadocs__editor__projects__inner__list__item__icon__big"
            src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715442416/code-circle_zzekez.svg"
          />
          <Popover className="relative ma-auto">
            <Popover.Button
              className="bonadocs__editor__projects__inner__list__item__icon"
              ref={setReferenceElement}
              onClick={(event) => {
                // setDeleteWidget(!deleteWidget);
                event.stopPropagation();
              }}
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
                      onClick={(event) => {
                        event.stopPropagation();
                        setInviteModal(!inviteModal);
                        close()
                      }}
                      className="bonadocs__editor__variables__table__item__popover__item__edit"
                    >
                      Team members
                    </div>
                    <div
                      onClick={(event) => {
                        // setDeleteWidget(!deleteWidget);
                        event.stopPropagation();
                        setDeleteModal(!deleteModal);
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
        </div>

        <div className="bonadocs__editor__projects__inner__list__item__inner">
          <div className="bonadocs__editor__projects__inner__list__item__info">
            <h3 className="bonadocs__editor__projects__inner__list__item__info__title">
              {teamItem.name}
            </h3>
            <h5 className="bonadocs__editor__projects__inner__list__item__info__description">
              {teamItem.slug}
            </h5>
            <div className="flex">
              <span className="bonadocs__editor__projects__inner__list__item__info__team">
                <TeamIcon />
                <h4 className="bonadocs__editor__projects__inner__list__item__info__team__members">
                  {teamMembers.length} members
                </h4>
              </span>
              <span className="bonadocs__editor__projects__inner__list__item__info__team ma-l2">
                <TeamIcon />
                <h4 className="bonadocs__editor__projects__inner__list__item__info__team__members">
                  {projectNumber} projects
                </h4>
              </span>
            </div>
          </div>
        </div>
      </div>
      <BonadocsEditorTeamsModalInvite
        show={inviteModal}
        closeInviteModal={() => setInviteModal(!inviteModal)}
        teamInfo={teamItem}
      />
      <BonadocsEditorTeamsModalDelete
        show={deleteModal}
        closeDeleteModal={() => setDeleteModal(!deleteModal)}
        teamItem={teamItem}
      />
    </>
  );
};
