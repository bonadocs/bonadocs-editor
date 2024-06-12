import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo/Logo";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";

export const BonadocsEditorProjects: React.FC = () => {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });

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
                interacting with Uniswap.
              </h5>
            </div>
            <Popover className="relative ma-auto">
              <Popover.Button
                className="bonadocs__editor__projects__inner__list__item__icon"
                ref={setReferenceElement}
              >
                <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715454229/More_aiemyt.svg" />
              </Popover.Button>
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="bonadocs__editor__variables__table__item__popover"
              >
                {({ close }) => (
                  <>
                    <div className="bonadocs__editor__variables__table__item__popover__item">
                      <div
                        onClick={() => {
                          // setEditWidget(!editWidget);
                          close();
                        }}
                        className="bonadocs__editor__variables__table__item__popover__item__edit"
                      >
                        Edit Variable
                      </div>
                      <div
                        onClick={() => {
                          // setDeleteWidget(!deleteWidget);
                          close();
                        }}
                        className="bonadocs__editor__variables__table__item__popover__item__delete"
                      >
                        Delete Variable
                      </div>
                    </div>

                    <img src="/solutions.jpg" alt="" />
                  </>
                )}
              </Popover.Panel>
            </Popover>
          </div>
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
                interacting with Uniswap.
              </h5>
            </div>
            <Popover className="relative ma-auto">
              <Popover.Button
                className="bonadocs__editor__projects__inner__list__item__icon"
                ref={setReferenceElement}
              >
                <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715454229/More_aiemyt.svg" />
              </Popover.Button>
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="bonadocs__editor__variables__table__item__popover"
              >
                {({ close }) => (
                  <>
                    <div className="bonadocs__editor__variables__table__item__popover__item">
                      <div
                        onClick={() => {
                          // setEditWidget(!editWidget);
                          close();
                        }}
                        className="bonadocs__editor__variables__table__item__popover__item__edit"
                      >
                        Edit Variable
                      </div>
                      <div
                        onClick={() => {
                          // setDeleteWidget(!deleteWidget);
                          close();
                        }}
                        className="bonadocs__editor__variables__table__item__popover__item__delete"
                      >
                        Delete Variable
                      </div>
                    </div>

                    <img src="/solutions.jpg" alt="" />
                  </>
                )}
              </Popover.Panel>
            </Popover>
          </div>
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
                interacting with Uniswap.
              </h5>
            </div>
            <Popover className="relative ma-auto">
              <Popover.Button
                className="bonadocs__editor__projects__inner__list__item__icon"
                ref={setReferenceElement}
              >
                <img src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715454229/More_aiemyt.svg" />
              </Popover.Button>
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="bonadocs__editor__variables__table__item__popover"
              >
                {({ close }) => (
                  <>
                    <div className="bonadocs__editor__variables__table__item__popover__item">
                      <div
                        onClick={() => {
                          // setEditWidget(!editWidget);
                          close();
                        }}
                        className="bonadocs__editor__variables__table__item__popover__item__edit"
                      >
                        Edit Variable
                      </div>
                      <div
                        onClick={() => {
                          // setDeleteWidget(!deleteWidget);
                          close();
                        }}
                        className="bonadocs__editor__variables__table__item__popover__item__delete"
                      >
                        Delete Variable
                      </div>
                    </div>

                    <img src="/solutions.jpg" alt="" />
                  </>
                )}
              </Popover.Panel>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
