import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo/Logo";
import React from "react";

export const BonadocsEditorProjects: React.FC = () => {
  return (
    <div className="bonadocs__editor__projects">
      <div className="bonadocs__editor__projects__inner">
        <Logo />
        <div className="bonadocs__editor__projects__inner__header">
          <div className="bonadocs__editor__projects__inner__header__left">
            <h1 className="bonadocs__editor__projects__inner__header__left__title">
              Your Projects
            </h1>
            <h5 className="bonadocs__editor__projects__inner__header__left__description">
              Select these projects to see where you stopped.
            </h5>
          </div>
          <div className="bonadocs__editor__projects__inner__header__right">
            <Button className="bonadocs__editor__projects__inner__header__right__button">
              <>
                <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715430320/Import_Icon_xivizm.svg" />
                Import Project
              </>
            </Button>
            <Button
              type="action"
              className="bonadocs__editor__projects__inner__header__right__button"
            >
              <>
                <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715430556/Add_Icon_wmenad.svg" />
                Create Project
              </>
            </Button>
          </div>
        </div>
        <div className="bonadocs__editor__projects__inner__list">
          <div className="bonadocs__editor__projects__inner__list__item">
            <img
              className="bonadocs__editor__projects__inner__list__item__icon"
              src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715442416/code-circle_zzekez.svg"
            />
            <div className="bonadocs__editor__projects__inner__list__item__info">
              <h3 className="bonadocs__editor__projects__inner__list__item__info__title">
                Uniswap v3
              </h3>
              <h5 className="bonadocs__editor__projects__inner__list__item__info__description">
                Uniswap V3 is a binary smart contract system comprised of many
                libraries, which together make the Core and Periphery. Core
                contracts provide fundamental safety guarantees for all parties
                interacting with Uniswap. They define the logic of pool
                generation, the pools themselves, and the interactions involving
                the respective assets therein. Periphery contracts interact with
                one or more Core contracts but are not part of the core. They
                are designed to provide methods of interacting with the core
                that increase clarity and user safety.
              </h5>
            </div>
            <img
              className="bonadocs__editor__projects__inner__list__item__icon"
              src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715442416/code-circle_zzekez.svg"
            />
          </div>
          <div className="bonadocs__editor__projects__inner__list__item"></div>
          <div className="bonadocs__editor__projects__inner__list__item"></div>
          <div className="bonadocs__editor__projects__inner__list__item"></div>
        </div>
      </div>
    </div>
  );
};
