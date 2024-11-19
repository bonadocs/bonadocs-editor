import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo/Logo";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, setTeamItems } from "@/store/team/teamSlice";
import { BonadocsEditorTeamsItem } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsItem";
import { BonadocsEditorTeamsModalCreate } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalCreate";
import { AppDispatch, RootState } from "@/store";
import { useSearchParams } from "react-router-dom";
import { BonadocsEditorTeamsModalAcceptInvite } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalAcceptInvite";
import { LoadingModal } from "@/layout/Modal/LoadingModal";
import { setLoadingScreen } from "@/store/controlBoard/controlBoardSlice";
import { useAuthContext } from "@/context/AuthContext";
import { MetaTags } from "@/components/metatags/Metatags";
import { ReactComponent as CodePlaceholder } from "@/assets/SidebarIcons/codePlaceholder.svg";
import { BonadocsEditorSidebarTeam } from "@/layout/BonadocsEditorSidebar/BonadocsEditorTeamSidebar/BonadocsEditorTeamSidebar";
import { BonadocsEditorViewHeaderProfile } from "@/layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeaderProfile";
import { set } from "lodash";

export const BonadocsEditorTeams: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const [show, setShow] = useState(false);
  const [showAcceptInvite, setShowAcceptInvite] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [teams, setTeams] = useState<any[]>([]);
  const loadingScreen = useSelector(
    (state: RootState) => state.controlBoard.loadingScreen
  );
  const teamList = useSelector((state: RootState) => state.team.teamList);
  const inviteToken = queryParameters.get("inviteToken");

  const loaderCount = useRef(0);

  useEffect(() => {
    if (loaderCount.current === 0) {
      getTeamsList();
      return;
    }
    setTeams(teamList);
  }, [teamList.length]);

  const getTeamsList = async () => {
    dispatch(setLoadingScreen(true));
    const teamList = await dispatch(getTeams());
    if (!teamList.payload) return;
    setTeams(teamList.payload);

    dispatch(setLoadingScreen(false));
    if (inviteToken) {
      setShowAcceptInvite(true);
    }
    loaderCount.current++;
  };

  return (
    <>
      <BonadocsEditorSidebarTeam className="bonadocs__editor__sidebar" />
      <div className="bonadocs__editor__projects">
        <MetaTags
          title={`Bonadocs Playground`}
          description={`The playground provides a simple and practical way to enable devs to integrate in their production apps and protocols.`}
        />
        <div className="bonadocs__editor__projects__inner">
          <>
            <div className="bonadocs__editor__projects__inner__header">
              <div className="bonadocs__editor__projects__inner__header__left">
                <h1 className="bonadocs__editor__projects__inner__header__left__title">
                  Teams
                </h1>
              </div>
              <div className="bonadocs__editor__projects__inner__header__right">
                <BonadocsEditorViewHeaderProfile />
              </div>
            </div>
            {teams.length > 0 ? (
              <div className="bonadocs__editor__projects__inner__list">
                {teams.map((team, index) => (
                  <BonadocsEditorTeamsItem teamItem={team} key={index} />
                ))}
              </div>
            ) : (
              <div className="bonadocs__editor__sidebar__info__code bonadocs__editor__sidebar__info__code__placeholder">
                {<CodePlaceholder />}
                <h3 className="bonadocs__editor__sidebar__info__code__title">
                  You don't have any projects yet
                </h3>
                <div className="flex">
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
                    onClick={() => setShow(!show)}
                    className="bonadocs__editor__projects__creation__add__title"
                  >
                    Create a new team
                  </h3>
                </div>
              </div>
            )}
          </>
        </div>
        <BonadocsEditorTeamsModalCreate
          show={show}
          closeCreateModal={() => setShow(!show)}
        />
        <BonadocsEditorTeamsModalAcceptInvite
          inviteToken={inviteToken!}
          show={showAcceptInvite}
          closeInviteModal={() => setShowAcceptInvite(!showAcceptInvite)}
        />
        <LoadingModal show={loadingScreen} />
      </div>
    </>
  );
};
