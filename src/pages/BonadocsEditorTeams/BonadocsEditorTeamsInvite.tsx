import { Logo } from "@/components/logo/Logo";
import React from "react";

export const BonadocsEditorTeamsInvite: React.FC = () => {
  return (
    <div className="bonadocs__editor__login">
      <div className="bonadocs__editor__login__inner">
        <Logo className="bonadocs__editor__sidebar__logo" />

        <div className="demarcation1">
          {/* <h2 className="bonadocs__editor__login__inner__title">
            Get Started with Bonadocs
          </h2> */}
          <div className="bonadocs__button bonadocs__button__inertia">
            pokmklmlkmklmm
          </div>
        </div>

        <div className="bonadocs__editor__dashboard__header__connect">
          <button
            className="bonadocs__button bonadocs__button__inertia"
            id="ctn__button"
            type="button"
          >
            Connect wallet
          </button>
        </div>
      </div>
    </div>
  );
};
