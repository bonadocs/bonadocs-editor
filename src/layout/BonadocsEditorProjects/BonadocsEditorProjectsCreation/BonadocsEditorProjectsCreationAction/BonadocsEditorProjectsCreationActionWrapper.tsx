import React from "react";
import { Button } from "@/components/button/Button";
import { BonadocsEditorProjectsCreationActionProject } from "./BonadocsEditorProjectsCreationActionProject";
import { BonadocsEditorProjectsCreationActionContract } from "./BonadocsEditorProjectsCreationActionContract/BonadocsEditorProjectsCreationActionContract";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setProjectView } from "@/store/project/projectSlice";
import { projectFilled, projectValidation } from "@/store/project/projectSlice";
import { Tooltip } from "react-tooltip";

export const BonadocsEditorProjectsCreationActionWrapper: React.FC = () => {
  const projectView = useSelector(
    (state: RootState) => state.project.projectView
  );
  const projectItem = useSelector(
    (state: RootState) => state.project.projectItem
  );
  const dispatch: AppDispatch = useDispatch();
  const filled = useSelector(projectFilled);
  const validation = useSelector(projectValidation);

  return (
    <div className="bonadocs__editor__projects__action__wrapper">
      {projectView ? (
        <BonadocsEditorProjectsCreationActionProject />
      ) : (
        <BonadocsEditorProjectsCreationActionContract />
      )}
      {!projectView && (
        <Button
          type="action"
          className="bonadocs__editor__projects__action__button"
          // disabled={projectView && filled ? filled : !projectView ? true : false}
          onClick={() => {
            dispatch(setProjectView(!projectView));
          }}
        >
          Back
        </Button>
      )}
      <Button
        type="action"
        className="bonadocs__editor__projects__action__button bonadocs__editor__projects__action__button__create"
        disabled={
          projectView && !filled
            ? false
            : !projectView && validation.status
            ? false
            : true
        }
        onClick={() => {
          if (projectView) {
            dispatch(setProjectView(false));
          } else {
            console.log("create project");
          }
          // dispatch(setProjectView(!projectView));
        }}
      >
        {projectView ? "Next" : "Create playground"}
      </Button>
      {!validation.status && !projectView && (
        <Tooltip
          opacity={1}
          clickable
          anchorSelect={`.bonadocs__editor__projects__action__button__create`}
        >
          {validation.message}
        </Tooltip>
      )}
    </div>
  );
};
