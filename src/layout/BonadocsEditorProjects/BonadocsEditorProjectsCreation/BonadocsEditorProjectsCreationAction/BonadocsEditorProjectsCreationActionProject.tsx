import React, { useState } from "react";
import { TextInput } from "@/components/input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setProjectItem } from "@/store/project/projectSlice";
export const BonadocsEditorProjectsCreationActionProject: React.FC = () => {
  const projectItem = useSelector(
    (state: RootState) => state.project.projectItem
  );

  const [projectName, setProjectName] = useState<string>(projectItem.name);
  const [projectDescription, setProjectDescription] = useState<string>(
    projectItem.description!
  );

  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="bonadocs__editor__projects__action__project">
      <h2 className="bonadocs__editor__projects__action__project__title">
        Project details
      </h2>

      <div className="bonadocs__editor__projects__action__project__form">
        <div className="bonadocs__editor__projects__action__project__form__item">
          <h4 className="bonadocs__editor__projects__action__project__form__item__name">
            Project name
          </h4>
          <TextInput
            className="bonadocs__editor__projects__action__project__form__item__input"
            handleChange={(e) => {
              setProjectName(e.target.value);
              dispatch(
                setProjectItem({
                  name: e.target.value,
                  description: projectDescription!,
                })
              );
            }}
            value={projectName}
            placeholder="Project name"
          />
        </div>
        <div className="bonadocs__editor__projects__action__project__form__item">
          <h4 className="bonadocs__editor__projects__action__project__form__item__name">
            Project description
          </h4>
          <TextInput
            className="bonadocs__editor__projects__action__project__form__item__input"
            handleChange={(e) => {
              setProjectDescription(e.target.value);
              dispatch(
                setProjectItem({
                  name: projectName,
                  description: e.target.value,
                })
              );
            }}
            value={projectDescription}
            placeholder="Project description"
          />
        </div>
      </div>
    </div>
  );
};
