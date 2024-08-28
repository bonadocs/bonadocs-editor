import React from "react";
import { Button } from "@/components/button/Button";
import { BonadocsEditorProjectsCreationActionProject } from "./BonadocsEditorProjectsCreationActionProject";
import { BonadocsEditorProjectsCreationActionContract } from "./BonadocsEditorProjectsCreationActionContract/BonadocsEditorProjectsCreationActionContract";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setProjectView } from "@/store/project/projectSlice";
import {
  projectFilled,
  projectValidation,
  createCollection,
} from "@/store/project/projectSlice";
import { Tooltip } from "react-tooltip";
import { useCollectionContext } from "@/context/CollectionContext";
import { CollectionDataManager } from "@bonadocs/core";
import { useNavigate } from "react-router-dom";

export const BonadocsEditorProjectsCreationActionWrapper: React.FC = () => {
  const { setCollection } = useCollectionContext();
  const projectView = useSelector(
    (state: RootState) => state.project.projectView
  );

  const dispatch: AppDispatch = useDispatch();
  const filled = useSelector(projectFilled);
  const validation = useSelector(projectValidation);
  const navigate = useNavigate();

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
        onClick={async () => {
          if (projectView) {
            dispatch(setProjectView(false));
          } else {
            console.log("create project");
            const newCollection = await dispatch(createCollection());
            if (!newCollection) return;
            setCollection(newCollection.payload as CollectionDataManager);
            console.log("newCollection", newCollection);

            // navigate({
            //   pathname: "/contracts",
            // });
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
