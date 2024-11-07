import React, { useState } from "react";
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
import { MoonLoader } from "react-spinners";

export const BonadocsEditorProjectsCreationActionWrapper: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setCollection } = useCollectionContext();
  const projectView = useSelector(
    (state: RootState) => state.project.projectView
  );
  const teamId = useSelector((state: RootState) => state.team.currentTeam?.id);

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
            setLoading(true);
            const newCollection = await dispatch(createCollection());
            if (!newCollection) return;
            setCollection(newCollection.payload as CollectionDataManager);
            setLoading(false);
            navigate({
              pathname: `/teams/${teamId}/projects`,
            });
          }

          // dispatch(setProjectView(!projectView));
        }}
      >
        {projectView ? (
          "Next"
        ) : (
          <>
            {loading ? (
              <MoonLoader
                color="#0f141b"
                loading={true}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              `Create Project`
            )}
          </>
        )}
      </Button>
      {!projectView && (
        <Button
          type="inertia"
          className="bonadocs__editor__projects__action__button"
          // disabled={projectView && filled ? filled : !projectView ? true : false}
          onClick={() => {
            dispatch(setProjectView(!projectView));
          }}
        >
          Back
        </Button>
      )}
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
