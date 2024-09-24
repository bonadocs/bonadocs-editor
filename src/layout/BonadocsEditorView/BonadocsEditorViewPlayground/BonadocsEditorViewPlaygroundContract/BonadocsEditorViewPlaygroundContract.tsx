import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BonadocsEditorViewPlaygroundContractAccordionList } from "./BonadocsEditorViewPlaygroundContractAccordion/BonadocsEditorViewPlaygroundContractAccordionList";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setWriteMethod } from "@/store/controlBoard/controlBoardSlice";
import { BonadocsEditorViewPlaygroundContractModal } from "./BonadocsEditorViewPlaygroundContractModal/BonadocsEditorViewPlaygroundContractModal";

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

  const [isOpen, setIsOpen] = useState(false);

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
        
        <img
          onClick={() => setIsOpen(!isOpen)}
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1720750528/Icon_Edit_kvkncx.svg"
          alt="Edit project"
          className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
        />
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
      <BonadocsEditorViewPlaygroundContractModal
        closeProjectModal={() => setIsOpen(!isOpen)}
        show={isOpen}
      />
    </div>
  );
};
