import { TeamSettings } from "@/data/team/TeamRoles";
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
import { setLoadingScreen } from "@/store/controlBoard/controlBoardSlice";
import { LoadingModal } from "@/layout/Modal/LoadingModal";
import { BonadocsEditorProjectSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorProjectSidebar/BonadocsEditorProjectSidebar";
import { BonadocsEditorViewHeaderProfile } from "@/layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeaderProfile";
import BonadocsEditorProjectsMembers from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsMembers";
import { BonadocsEditorProjectsBillings } from "@/layout/BonadocsEditorProjects/BonadocsEditorProjectsBillings/BonadocsEditorProjectsBillings";

export const BonadocsEditorProjects: React.FC = () => {
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [currentProjectSettings, setCurrentProjectSettings] = useState<any>(
    TeamSettings[0]
  );
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
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

  const fetchMembers = async () => {
    const members = await dispatch(getTeamById(id!));
    if (members.payload) {
      setTeamMembers(members.payload["users"]);
    }
  };

  useEffect(() => {
    currentProject();
    fetchMembers();
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
              </div>
            </div>
            <div className="bonadocs__editor__projects__inner__control">
              {TeamSettings.map((item, index) => (
                <div
                  key={index}
                  className={`bonadocs__editor__projects__inner__control__item ${
                    currentProjectSettings.name === item.name &&
                    "bonadocs__editor__projects__inner__control__item__active"
                  }`}
                  onClick={() => {
                    setCurrentProjectSettings(item);
                  }}
                >
                  {item.name}
                  {item.name === "Members" && (
                    <div
                      className={`bonadocs__editor__projects__inner__control__item__members ${
                        currentProjectSettings.name === item.name &&
                        "bonadocs__editor__projects__inner__control__item__members__active"
                      }`}
                    >
                      {teamMembers.length}
                    </div>
                  )}
                </div>
              ))}
              <div className="bonadocs__editor__projects__inner__control__free"></div>
            </div>

            {currentProjectSettings.name === "Projects" && (
              <>
                <div className="flex">
                  <h2>ALL PROJECTS</h2>
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
                </div>
                <div className="bonadocs__editor__projects__inner__list bonadocs__editor__projects__inner__list__projects">
                  {teamProjects.map(
                    (projectItem: ProjectItem, index: number) => (
                      <BonadocsEditorProjectsItem
                        projectItem={projectItem}
                        key={index}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {currentProjectSettings.name === "Members" && (
              <BonadocsEditorProjectsMembers teamMembers={teamMembers} />
            )}

            {currentProjectSettings.name === "Billings" && (
              <BonadocsEditorProjectsBillings />
            )}
          </>
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
