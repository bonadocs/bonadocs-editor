import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import { ProjectItem } from "@/data/dataTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteProject } from "@/store/project/projectSlice";

interface BonadocsEditorProjectsItemProps {
  projectItem: ProjectItem;
}

export const BonadocsEditorProjectsItem: React.FC<
  BonadocsEditorProjectsItemProps
> = ({ projectItem }) => {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });
  const [inviteModal, setInviteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  return (
    <div className="bonadocs__editor__projects__inner__list__item">
      {/* <div
        
        className="bonadocs__editor__projects__inner__list__item"
      > */}
      <div className="flex">
        <img
          className="bonadocs__editor__projects__inner__list__item__icon"
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715442416/code-circle_zzekez.svg"
        />
        <div
          onClick={() => {
            navigate(`${projectItem.id}`);
          }}
          className="bonadocs__editor__projects__inner__list__item__info font-md"
        >
          <h3 className="bonadocs__editor__projects__inner__list__item__info__title">
            {projectItem.name}
          </h3>
          <h5 className="bonadocs__editor__projects__inner__list__item__info__description">
            {projectItem.description}
          </h5>
        </div>
        {/* </div> */}

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
                    onClick={async () => {
                      // setDeleteWidget(!deleteWidget);
                      await dispatch(deleteProject(projectItem));
                      close();
                    }}
                    className="bonadocs__editor__variables__table__item__popover__item__delete"
                  >
                    Delete Project
                  </div>
                  {/* <div
                  onClick={async () => {
                    // setDeleteWidget(!deleteWidget);
                    await dispatch(getProjectData(projectItem));
                    close();
                  }}
                  className="bonadocs__editor__variables__table__item__popover__item__delete"
                >
                  Get project data
                </div>
                <div
                  onClick={() => {
                    console.log(projectItem);

                    dispatch(updateProject(projectItem));
                  }}
                  className="bonadocs__editor__variables__table__item__popover__item__"
                >
                  Update project to public
                </div> */}
                  {/* <div
                  onClick={() => {
                    console.log(projectItem);

                    dispatch(getProjectLink(projectItem));
                  }}
                  className="bonadocs__editor__variables__table__item__popover__item__"
                >
                  Get project Link
                </div> */}
                </div>

                <img src="/solutions.jpg" alt="" />
              </>
            )}
          </Popover.Panel>
        </Popover>
      </div>
      <h2 className="bonadocs__editor__projects__inner__list__item__descr"> {projectItem.description}</h2>
      <h3>Team: {currentTeam.name}</h3>
    </div>
  );
};
