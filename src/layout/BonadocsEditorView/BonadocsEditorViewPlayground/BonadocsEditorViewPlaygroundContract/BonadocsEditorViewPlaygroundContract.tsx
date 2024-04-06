import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BonadocsEditorViewPlaygroundContractAccordionList } from "./BonadocsEditorViewPlaygroundContractAccordion/BonadocsEditorViewPlaygroundContractAccordionList";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setWriteMethod } from "@/store/controlBoard/controlBoardSlice";
import { Tooltip } from "react-tooltip";
interface BonadocsEditorViewPlaygroundContractProps {
  className?: string;
}
export const BonadocsEditorViewPlaygroundContract: React.FC<
  BonadocsEditorViewPlaygroundContractProps
> = ({ className }) => {
  const currentContract = useSelector(
    (state: RootState) => state.contract.currentContract
  );
  const writeMethod = useSelector(
    (state: RootState) => state.controlBoard.writeMethod
  );
  const dispatch: AppDispatch = useDispatch();

  // const [isOverflown, setIsOverflown] = useState(false);

  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const element = ref.current!;

  //   setIsOverflown(element.scrollWidth > element.clientWidth);
  //   const handleResize = () => {
  //     setIsOverflown(element.scrollWidth > element.clientWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className={className}>
      <div className="bonadocs__editor__dashboard__playground__contract__header">
        <h3
          // ref={ref}
          className={`bonadocs__editor__dashboard__playground__contract__header__title`}
        >
          {currentContract.name}
        </h3>
        <svg
          className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 8L12 8"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 12L8 4"
            stroke="#95A8C0"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="bonadocs__editor__dashboard__playground__contract__type">
        <div className="bonadocs__editor__dashboard__playground__contract__type__container">
          <div
            className={`bonadocs__editor__dashboard__playground__contract__type__container__item ${
              writeMethod ? "" : "bona__active"
            }`}
            onClick={() => dispatch(setWriteMethod(false))}
          >
            Read
          </div>
          <div
            className={`bonadocs__editor__dashboard__playground__contract__type__container__item ${
              writeMethod && "bona__active"
            }`}
            onClick={() => dispatch(setWriteMethod(true))}
          >
            Write
          </div>
        </div>
      </div>
      <div className="bonadocs__editor__dashboard__playground__contract__list">
        <BonadocsEditorViewPlaygroundContractAccordionList />
      </div>
    </div>
  );
};
