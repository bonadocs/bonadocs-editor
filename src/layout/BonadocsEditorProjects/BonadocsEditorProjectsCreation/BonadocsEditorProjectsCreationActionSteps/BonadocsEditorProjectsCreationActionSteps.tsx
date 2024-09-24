import React from "react";
import { BonadocsEditorProjectsCreationActionStepsItem } from "./BonadocsEditorProjectsCreationActionStepsItem";
import { setProjectView } from "@/store/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { projectFilled, projectValidation } from "@/store/project/projectSlice";
export const BonadocsEditorProjectsCreationActionSteps: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const filled = useSelector(projectFilled);
  const validation = useSelector(projectValidation);

  return (
    <div className="bonadocs__editor__projects__action__steps">
      <BonadocsEditorProjectsCreationActionStepsItem
        icon={
          !filled ? (
            <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720506746/Icon_Tick_Check_pmhxir.svg" />
          ) : (
            <h3>1</h3>
          )
        }
        iconText="Project Details"
        className="bonadocs__editor__projects__action__steps__item"
        onClick={() => dispatch(setProjectView(true))}
      />
      <div className="bonadocs__editor__projects__action__steps__gap"></div>

      <BonadocsEditorProjectsCreationActionStepsItem
        icon={
          validation.status ? (
            <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720506746/Icon_Tick_Check_pmhxir.svg" />
          ) : (
            <h3>2</h3>
          )
        }
        className="bonadocs__editor__projects__action__steps__item"
        iconText="Contract Details"
        disabled={filled}
        onClick={() => dispatch(setProjectView(false))}
      />
    </div>
  );
};
