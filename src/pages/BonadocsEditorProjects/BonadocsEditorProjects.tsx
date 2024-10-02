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

export const BonadocsEditorProjects: React.FC = () => {
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const teamProjects = useSelector(
    (state: RootState) => state.project.projectList
  );
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
  }, []);

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
    <div className="bonadocs__editor__projects">
      <div className="bonadocs__editor__projects__inner">
        <Logo />
        <>
          <div className="bonadocs__editor__projects__inner__header">
            <Button
              onClick={() => navigate({
                pathname: "/teams",
              })}
              type="default"
              className="bonadocs__editor__projects__inner__header__button"
            >
              <>
                <img
                  alt="go back"
                  src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720339940/Arrow-Back_tn27nc.svg"
                />
                Back to Teams
              </>
            </Button>
            <div className="bonadocs__editor__projects__inner__header__right">
              <Button
                disabled={!addProject}
                className="bonadocs__editor__projects__inner__header__right__button"
                onClick={() => setShowImportModal(!showImportModal)}
              >
                <>
                  <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715430320/Import_Icon_xivizm.svg" />
                  Import Project
                </>
              </Button>

              <Button
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
              </Button>
            </div>
          </div>
          <div className="bonadocs__editor__projects__inner__header__left">
            <h1 className="bonadocs__editor__projects__inner__header__left__title">
              Your Projects
            </h1>
            <h5 className="bonadocs__editor__projects__inner__header__left__description">
              Select these projects to see where you stopped.
            </h5>
          </div>
          <div className="bonadocs__editor__projects__inner__list">
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
  );
};
