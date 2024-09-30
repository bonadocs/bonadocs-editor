import React, { useEffect } from "react";
import { CheckboxInput } from "@/components/input/CheckboxInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import { setSimulation } from "@/store/controlBoard/controlBoardSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { Tab } from "@/components/tab/Tab";

interface BonadocsEditorSidebarSimulatorItemProps {
  className?: string;
}
export const BonadocsEditorSidebarSimulatorItem: React.FC<
  BonadocsEditorSidebarSimulatorItemProps
> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const simulation = useSelector(
    (state: RootState) => state.controlBoard.simulation
  );

  useEffect(() => {}, [simulation]);
  return (
    <div className={className}>
      <Tab
        className={`module ${
          simulation && className
        }__inner__active ${className}__inner`}
      >
        <>
          <CheckboxInput
            handleChange={(simulationState) => {
              dispatch(setSimulation(simulationState));
            }}
            checked={simulation}
          />
          <div className="bonadocs__editor__sidebar__simulation__title">
            {simulation ? `Simulation mode` : `Simulation off`}
          </div>
        </>
      </Tab>
    </div>
  );
};
