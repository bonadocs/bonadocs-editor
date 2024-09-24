import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo/Logo";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "@/store/team/teamSlice";
import { BonadocsEditorTeamsItem } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsItem";
import { BonadocsEditorTeamsModalCreate } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalCreate";
import { AppDispatch, RootState } from "@/store";
import { useSearchParams } from "react-router-dom";
import { BonadocsEditorTeamsModalAcceptInvite } from "@/layout/BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalAcceptInvite";
import { LoadingModal } from "@/layout/Modal/LoadingModal";
import { setLoadingScreen } from "@/store/controlBoard/controlBoardSlice";
import { useAuthContext } from "@/context/AuthContext";

export const BonadocsEditorTeams: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const [show, setShow] = useState(false);
  const [showAcceptInvite, setShowAcceptInvite] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const teams = useSelector((state: RootState) => state.team.teamList);
  const loadingScreen = useSelector(
    (state: RootState) => state.controlBoard.loadingScreen
  );
  const inviteToken = queryParameters.get("inviteToken");
  const { signOut } = useAuthContext();
  useEffect(() => {
    dispatch(setLoadingScreen(true));
    dispatch(getTeams());
    dispatch(setLoadingScreen(false));
    if (inviteToken) {
      setShowAcceptInvite(true);
    }
  }, []);

  return (
    <div className="bonadocs__editor__projects">
      <div className="bonadocs__editor__projects__inner">
        <Logo />
        <>
          <div className="bonadocs__editor__projects__inner__header">
            <div className="bonadocs__editor__projects__inner__header__left">
              <h1 className="bonadocs__editor__projects__inner__header__left__title">
                Your Teams
              </h1>
              <h5 className="bonadocs__editor__projects__inner__header__left__description">
                Select your team and get started
              </h5>
            </div>
            <div className="bonadocs__editor__projects__inner__header__right">
              <Button
                type="action"
                className="bonadocs__editor__projects__inner__header__right__button"
                onClick={() => setShow(!show)}
              >
                <>
                  <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715430556/Add_Icon_wmenad.svg" />
                  Create Team
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
          <div className="bonadocs__editor__projects__inner__list">
            {teams.map((team, index) => (
              <BonadocsEditorTeamsItem teamItem={team} key={index} />
            ))}
          </div>
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
  );
};
