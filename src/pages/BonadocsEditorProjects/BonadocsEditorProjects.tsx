import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo/Logo";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCollections, setProjectList } from "@/store/project/projectSlice";
import { BonadocsEditorProjectsCreationModal } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsCreation/BonadocsEditorProjectsCreationAction/BonadocsEditorProjectsCreationModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useParams } from "react-router-dom";
import { getTeamById } from "@/store/team/teamSlice";
import { ProjectItem } from "@/data/dataTypes";
import { BonadocsEditorProjectsItem } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsItem";
import { useAuthContext } from "@/context/AuthContext";
import { setLoadingScreen } from "@/store/controlBoard/controlBoardSlice";
import { LoadingModal } from "@/layout/Modal/LoadingModal";
import { BonadocsEditorProjectSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorProjectSidebar/BonadocsEditorProjectSidebar";
import { BonadocsEditorViewHeaderProfile } from "@/layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeaderProfile";

export const BonadocsEditorProjects: React.FC = () => {
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const teamProjects = useSelector(
    (state: RootState) => state.project.projectList
  );

  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  const currentTeamPermissions = useSelector(
    (state: RootState) => state.team.currentTeam
  );

  const loadingScreen = useSelector(
    (state: RootState) => state.controlBoard.loadingScreen
  );

  const { signOut } = useAuthContext();

  const addProject =
    currentTeamPermissions.permissions?.includes("writeCollections");

  useEffect(() => {
    currentProject();
  }, [id]);

  const currentProject = async () => {
    dispatch(setLoadingScreen(true));
    dispatch(setProjectList([]));
    if (id) {
      await dispatch(getTeamById(id));
    }

    const projects = await dispatch(fetchCollections());
    dispatch(setLoadingScreen(false));
    if (!projects.payload) {
      return;
    }
  };

  return (
    <>
      <BonadocsEditorProjectSidebar className="bonadocs__editor__sidebar" />
      <div className="bonadocs__editor__projects">
        <div className="bonadocs__editor__projects__inner">
          <>
            <div className="bonadocs__editor__projects__inner__header">
              <h1 className="bonadocs__editor__projects__inner__header__left white">
                {currentTeam?.name}
              </h1>
              <div className="bonadocs__editor__projects__inner__header__right">
                <BonadocsEditorViewHeaderProfile />

                {/* <Button
                  disabled={!addProject}
                  type="action"
                  className="bonadocs__editor__projects__inner__header__right__button"
                  onClick={() => {
                    navigate({
                      pathname: `${location.pathname}/create`,
                    });
                  }}
                >
                  <>
                    <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715430556/Add_Icon_wmenad.svg" />
                    Create Project
                  </>
                </Button>
                <Button
                  className="bonadocs__editor__projects__inner__header__right__button"
                  onClick={() => signOut()}
                >
                  <>
                    <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1727131299/icons8-sign-out-50_xj89ke.png" />
                    Sign out
                  </>
                </Button> */}
              </div>
            </div>
            <div className="flex ma-auto ma-bottom-sm">
              <svg
                className="bonadocs__editor__dashboard__playground__contract__header__addIconn bonadocs__editor__projects__creation__add__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8L12 8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12L8 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3
                onClick={() =>
                  navigate({
                    pathname: `${location.pathname}/create`,
                  })
                }
                className="bonadocs__editor__projects__creation__add__title"
              >
                Create new Project
              </h3>
            </div>
            <div className="bonadocs__editor__projects__inner__list bonadocs__editor__projects__inner__list__projects">
              {teamProjects.map((projectItem: ProjectItem, index: number) => (
                <BonadocsEditorProjectsItem
                  projectItem={projectItem}
                  key={index}
                />
              ))}
            </div>
          </>
          {/* <Outlet /> */}
        </div>
        <BonadocsEditorProjectsCreationModal
          show={showImportModal}
          closeImportModal={() => setShowImportModal(!showImportModal)}
          handleImportCollection={() => {}}
        />
        <LoadingModal show={loadingScreen} />
      </div>
    </>
  );
};
